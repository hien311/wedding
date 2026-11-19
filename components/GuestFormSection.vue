<script setup lang="ts">
import WishDoveFrame from '~/components/WishDoveFrame.vue'

type Wish = {
  id: string
  name: string
  message: string
  createdAt: string
}

/** Placeholder — API/Mongo sẽ nối lại sau */
const FORM_ENABLED = false

const wishes = ref<Wish[]>([])
const name = ref('')
const guests = ref(1)
const status = ref<'yes' | 'no' | 'maybe'>('yes')
const message = ref('')
const feedback = ref(
  FORM_ENABLED ? '' : 'Tính năng xác nhận & lời chúc sẽ sớm mở — hiện chỉ xem trước giao diện.',
)
const feedbackType = ref<'ok' | 'error' | ''>(FORM_ENABLED ? '' : 'ok')
const submitting = ref(false)
const loading = ref(false)

const options = [
  { value: 'yes', label: 'Tham dự' },
  { value: 'maybe', label: 'Chưa chắc' },
  { value: 'no', label: 'Không tham dự' },
] as const

async function submit() {
  if (!FORM_ENABLED) return
}
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
          <fieldset :disabled="!FORM_ENABLED">
            <div class="field">
              <label for="guest-name">Họ và tên</label>
              <input
                id="guest-name"
                v-model="name"
                type="text"
                maxlength="80"
                :required="FORM_ENABLED"
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
                  :required="FORM_ENABLED"
                />
              </div>
              <div class="field">
                <label for="guest-status">Trạng thái</label>
                <select id="guest-status" v-model="status" :required="FORM_ENABLED">
                  <option v-for="opt in options" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="field">
              <label for="guest-message">Lời chúc</label>
              <textarea
                id="guest-message"
                v-model="message"
                maxlength="500"
                :required="FORM_ENABLED"
              />
            </div>

            <button class="btn btn-primary" type="submit" :disabled="!FORM_ENABLED || submitting">
              {{ FORM_ENABLED ? (submitting ? 'Đang gửi…' : 'Gửi xác nhận') : 'Sắp mở' }}
            </button>
          </fieldset>
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

.form fieldset {
  border: 0;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
  min-inline-size: 0;
}

.form fieldset:disabled {
  opacity: 0.72;
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
