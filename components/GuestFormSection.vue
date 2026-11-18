<script setup lang="ts">
import WishDoveFrame from '~/components/WishDoveFrame.vue'

type Wish = {
  id: string
  name: string
  message: string
  createdAt: string
}

const wishes = ref<Wish[]>([])
const name = ref('')
const guests = ref(1)
const status = ref<'yes' | 'no' | 'maybe'>('yes')
const message = ref('')
const feedback = ref('')
const feedbackType = ref<'ok' | 'error' | ''>('')
const submitting = ref(false)
const loading = ref(true)

const options = [
  { value: 'yes', label: 'Tham dự' },
  { value: 'maybe', label: 'Chưa chắc' },
  { value: 'no', label: 'Không tham dự' },
] as const

async function loadWishes() {
  loading.value = true
  try {
    wishes.value = await $fetch<Wish[]>('/api/wishes')
  } catch {
    wishes.value = []
  } finally {
    loading.value = false
  }
}

async function submit() {
  feedback.value = ''
  feedbackType.value = ''
  submitting.value = true
  try {
    const created = await $fetch<Wish & { guests: number; status: string }>('/api/guest', {
      method: 'POST',
      body: {
        name: name.value,
        guests: guests.value,
        status: status.value,
        message: message.value,
      },
    })
    wishes.value = [
      {
        id: created.id,
        name: created.name,
        message: created.message,
        createdAt: String(created.createdAt),
      },
      ...wishes.value,
    ]
    name.value = ''
    guests.value = 1
    status.value = 'yes'
    message.value = ''
    feedback.value = 'Đã nhận xác nhận và lời chúc của bạn. Cảm ơn nhiều!'
    feedbackType.value = 'ok'
  } catch (err: any) {
    feedback.value = err?.data?.statusMessage || err?.statusMessage || 'Gửi thất bại. Thử lại nhé.'
    feedbackType.value = 'error'
  } finally {
    submitting.value = false
  }
}

onMounted(loadWishes)
</script>

<template>
  <section id="guest" class="section">
    <div class="container layout">
      <div class="form-wrap reveal">
        <p class="section-label">Xác nhận</p>
        <h2 class="section-title">Tham dự & lời chúc</h2>
        <p class="section-lead">
          Cho chúng mình biết bạn có đến được không, và gửi thêm vài lời yêu thương nhé.
        </p>

        <form class="form" @submit.prevent="submit">
          <div class="field">
            <label for="guest-name">Họ và tên</label>
            <input
              id="guest-name"
              v-model="name"
              type="text"
              maxlength="80"
              required
              autocomplete="name"
            />
          </div>

          <div class="row">
            <div class="field">
              <label for="guest-count">Số khách</label>
              <input
                id="guest-count"
                v-model.number="guests"
                type="number"
                min="1"
                max="10"
                required
              />
            </div>
            <div class="field">
              <label for="guest-status">Trạng thái</label>
              <select id="guest-status" v-model="status" required>
                <option v-for="opt in options" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="field">
            <label for="guest-message">Lời chúc</label>
            <textarea id="guest-message" v-model="message" maxlength="500" required />
          </div>

          <button class="btn btn-primary" type="submit" :disabled="submitting">
            {{ submitting ? 'Đang gửi…' : 'Gửi xác nhận' }}
          </button>
          <p class="form-status" :class="feedbackType">{{ feedback }}</p>
        </form>
      </div>

      <WishDoveFrame :wishes="wishes" :loading="loading" />
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 2.5rem;
}

.form {
  margin-top: 1.5rem;
  display: grid;
  gap: 1rem;
}

.row {
  display: grid;
  gap: 1rem;
}

@media (min-width: 560px) {
  .row {
    grid-template-columns: 1fr 1.4fr;
  }
}

@media (min-width: 900px) {
  .layout {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
    gap: 3rem;
  }
}
</style>
