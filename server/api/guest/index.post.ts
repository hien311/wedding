import { getDb } from '../../utils/mongo'

const ALLOWED = new Set(['yes', 'no', 'maybe'])

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string
    guests?: number | string
    status?: string
    message?: string
  }>(event)

  const name = body?.name?.trim() || ''
  const status = (body?.status || '').trim().toLowerCase()
  const message = (body?.message || '').trim()
  const guests = Number(body?.guests ?? 1)

  if (name.length < 2 || name.length > 80) {
    throw createError({ statusCode: 400, statusMessage: 'Tên không hợp lệ.' })
  }
  if (!ALLOWED.has(status)) {
    throw createError({ statusCode: 400, statusMessage: 'Trạng thái tham dự không hợp lệ.' })
  }
  if (!Number.isFinite(guests) || guests < 1 || guests > 10) {
    throw createError({ statusCode: 400, statusMessage: 'Số khách phải từ 1 đến 10.' })
  }
  if (message.length < 5 || message.length > 500) {
    throw createError({ statusCode: 400, statusMessage: 'Lời chúc cần từ 5–500 ký tự.' })
  }

  const db = await getDb()
  const createdAt = new Date()
  const doc = { name, guests, status, message, createdAt }
  const result = await db.collection('guests').insertOne(doc)

  // Keep legacy collections in sync for easy Mongo browsing
  await Promise.all([
    db.collection('wishes').insertOne({ name, message, createdAt, guestId: result.insertedId }),
    db.collection('rsvps').insertOne({ name, guests, status, note: '', createdAt, guestId: result.insertedId }),
  ])

  return {
    id: String(result.insertedId),
    name,
    guests,
    status,
    message,
    createdAt,
  }
})
