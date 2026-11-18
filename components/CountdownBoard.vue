<script setup lang="ts">
const props = defineProps<{
  title: string
  at: string
  dateLabel: string
  timeLabel: string
}>()

const parts = useCountdown(() => props.at)

const units = computed(() => [
  { key: 'days', label: 'Ngày', value: parts.value.days },
  { key: 'hours', label: 'Giờ', value: parts.value.hours },
  { key: 'minutes', label: 'Phút', value: parts.value.minutes },
  { key: 'seconds', label: 'Giây', value: parts.value.seconds },
])
</script>

<template>
  <article class="board reveal">
    <p class="title">{{ title }}</p>
    <p class="meta">{{ dateLabel }} · {{ timeLabel }}</p>

    <p v-if="parts.done" class="done">Đã đến giờ — hẹn gặp bạn.</p>
    <div v-else class="grid" aria-live="polite">
      <div v-for="unit in units" :key="unit.key" class="cell">
        <strong>{{ unit.key === 'days' ? unit.value : padTime(unit.value) }}</strong>
        <span>{{ unit.label }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.board {
  background: rgba(26, 47, 36, 0.94);
  color: var(--ivory);
  border-radius: 22px;
  padding: 1.25rem 1rem 1.15rem;
  box-shadow: var(--shadow-soft);
  text-align: center;
}

.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 4vw, 1.7rem);
  font-weight: 500;
}

.meta {
  margin: 0.35rem 0 0;
  font-size: 0.88rem;
  opacity: 0.78;
}

.grid {
  margin-top: 1.1rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
}

.cell {
  background: rgba(247, 243, 236, 0.08);
  border-radius: 14px;
  padding: 0.75rem 0.25rem;
}

.cell strong {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 4.5vw, 1.85rem);
  font-weight: 500;
  line-height: 1;
}

.cell span {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.7;
}

.done {
  margin: 1.1rem 0 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
}
</style>
