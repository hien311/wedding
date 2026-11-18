<script setup lang="ts">
type Wish = {
  id: string
  name: string
  message: string
  createdAt: string
}

const props = defineProps<{
  wishes: Wish[]
  loading?: boolean
}>()

const open = ref(false)
const active = ref<Wish | null>(null)
const usedIds = ref<string[]>([])

const doves = [
  { id: 1, anim: 'fly-a', duration: '8s', delay: '0s', scale: 1.15 },
  { id: 2, anim: 'fly-b', duration: '9s', delay: '-1.6s', scale: 1.1 },
  { id: 3, anim: 'fly-c', duration: '7.5s', delay: '-3.2s', scale: 1.2 },
  { id: 4, anim: 'fly-d', duration: '8.5s', delay: '-4.8s', scale: 1.12 },
  { id: 5, anim: 'fly-e', duration: '9.5s', delay: '-6.4s', scale: 1.18 },
]

function pickWish(): Wish | null {
  if (!props.wishes.length) return null
  const pool = props.wishes.filter((w) => !usedIds.value.includes(w.id))
  const source = pool.length ? pool : props.wishes
  const wish = source[Math.floor(Math.random() * source.length)]
  usedIds.value = [...usedIds.value.filter((id) => id !== wish.id), wish.id].slice(-20)
  return wish
}

function onDoveClick() {
  const wish = pickWish()
  if (!wish) return
  active.value = wish
  open.value = true
}

function close() {
  open.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="wish-frame-wrap reveal">
    <h3>Thư từ bầu trời</h3>
    <p class="hint">Chạm chim bồ câu đang bay để mở một lời chúc ngẫu nhiên.</p>

    <div class="frame" role="group" aria-label="Khung thư lời chúc pixel">
      <div class="mat">
        <div class="sky">
          <div class="scanlines" aria-hidden="true" />
          <p v-if="loading" class="state">Đang tải lời chúc…</p>
          <p v-else-if="!wishes.length" class="state">
            Chưa có lời chúc — hãy gửi lời đầu tiên bên trái nhé.
          </p>

          <button
            v-for="dove in doves"
            :key="dove.id"
            type="button"
            class="dove"
            :class="dove.anim"
            :style="{
              '--duration': dove.duration,
              '--delay': dove.delay,
              '--scale': dove.scale,
            }"
            :disabled="loading || !wishes.length"
            :aria-label="`Mở thư lời chúc ${dove.id}`"
            @click="onDoveClick"
          >
            <img
              src="/images/wishes/dove.webp"
              alt=""
              width="128"
              height="128"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="open && active"
        class="letter-modal"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <article class="letter">
          <button class="close" type="button" aria-label="Đóng" @click="close">×</button>
          <p class="pixel-label">★ LETTER ★</p>
          <p class="from">Thư từ {{ active.name }}</p>
          <p class="body">{{ active.message }}</p>
          <button class="btn btn-primary" type="button" @click="close">Gấp thư lại</button>
        </article>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.wish-frame-wrap h3 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 500;
  color: var(--forest);
}

.hint {
  margin: 0 0 1rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.frame {
  padding: 10px;
  background: #5b3a1e;
  box-shadow:
    var(--shadow-soft),
    inset 0 0 0 3px #8b5a2b,
    inset 0 0 0 6px #3a2412;
  image-rendering: pixelated;
}

.mat {
  padding: 6px;
  background: #2b1a0d;
}

.sky {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  background:
    url('/images/wishes/sky.webp') center / cover no-repeat,
    linear-gradient(180deg, #7ec8f5 0%, #c9e8ff 55%, #9ecf8c 100%);
  image-rendering: pixelated;
}

.scanlines {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: repeating-linear-gradient(
    180deg,
    transparent 0 2px,
    rgba(0, 0, 0, 0.04) 2px 3px
  );
  mix-blend-mode: multiply;
}

.state {
  position: absolute;
  left: 50%;
  bottom: 1rem;
  z-index: 3;
  transform: translateX(-50%);
  margin: 0;
  width: min(90%, 280px);
  padding: 0.55rem 0.7rem;
  text-align: center;
  color: #1a2f24;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: rgba(255, 255, 255, 0.82);
  border: 3px solid #1a2f24;
  box-shadow: 3px 3px 0 #1a2f24;
  pointer-events: none;
}

.dove {
  position: absolute;
  width: clamp(96px, 26vw, 140px);
  border: 0;
  background: none;
  z-index: 4;
  /* hit area rộng hơn sprite */
  padding: 8px;
  margin: -8px;
  /* left/top % theo khung trời — KHÔNG dùng translate % (bị tính theo size chim) */
  animation-duration: var(--duration);
  animation-delay: var(--delay);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  filter: drop-shadow(2px 3px 0 rgba(26, 47, 36, 0.25));
  will-change: left, top;
}

.dove img {
  width: 100%;
  height: auto;
  display: block;
  background: transparent;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  transform: scale(var(--scale));
  transform-origin: center center;
  animation: flap 0.28s steps(2) infinite;
}

.dove:not(:disabled):hover {
  filter: drop-shadow(0 0 0 #fff) drop-shadow(2px 2px 0 #1a2f24);
  z-index: 5;
}

.dove:not(:disabled):hover img {
  transform: scale(calc(var(--scale) * 1.06));
}

.dove:not(:disabled):active img {
  transform: scale(calc(var(--scale) * 0.94));
}

.dove:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dove.fly-a {
  animation-name: fly-a;
}
.dove.fly-b {
  animation-name: fly-b;
}
.dove.fly-c {
  animation-name: fly-c;
}
.dove.fly-d {
  animation-name: fly-d;
}
.dove.fly-e {
  animation-name: fly-e;
}

.letter-modal {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(14, 24, 18, 0.55);
}

.letter {
  position: relative;
  width: min(420px, 100%);
  padding: 1.4rem 1.2rem 1.2rem;
  background: #fff6e8;
  border: 4px solid #1a2f24;
  box-shadow: 6px 6px 0 #1a2f24;
  animation: open-letter 0.25s steps(4);
}

.close {
  position: absolute;
  top: 0.4rem;
  right: 0.45rem;
  width: 34px;
  height: 34px;
  border: 3px solid #1a2f24;
  background: #f2d27a;
  font-size: 1.25rem;
  line-height: 1;
  color: #1a2f24;
  box-shadow: 2px 2px 0 #1a2f24;
}

.pixel-label {
  margin: 0 0 0.4rem;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  font-weight: 800;
  color: #b8956c;
}

.from {
  margin: 0 0 0.7rem;
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--forest);
  font-weight: 600;
}

.body {
  margin: 0 0 1.1rem;
  color: var(--muted);
  white-space: pre-wrap;
  line-height: 1.6;
  min-height: 4.5rem;
}

@keyframes flap {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2px);
  }
}

/*
  left/top theo % khung trời.
  max ~78%/72% để chim to không tràn mép.
*/
@keyframes fly-a {
  0% {
    left: 2%;
    top: 4%;
  }
  25% {
    left: 38%;
    top: 10%;
  }
  50% {
    left: 72%;
    top: 3%;
  }
  75% {
    left: 42%;
    top: 14%;
  }
  100% {
    left: 2%;
    top: 4%;
  }
}

@keyframes fly-b {
  0% {
    left: 78%;
    top: 2%;
  }
  25% {
    left: 70%;
    top: 30%;
  }
  50% {
    left: 78%;
    top: 56%;
  }
  75% {
    left: 66%;
    top: 74%;
  }
  100% {
    left: 78%;
    top: 2%;
  }
}

@keyframes fly-c {
  0% {
    left: 10%;
    top: 22%;
  }
  20% {
    left: 48%;
    top: 36%;
  }
  40% {
    left: 72%;
    top: 52%;
  }
  60% {
    left: 46%;
    top: 70%;
  }
  80% {
    left: 16%;
    top: 48%;
  }
  100% {
    left: 10%;
    top: 22%;
  }
}

@keyframes fly-d {
  0% {
    left: 4%;
    top: 74%;
  }
  25% {
    left: 34%;
    top: 66%;
  }
  50% {
    left: 64%;
    top: 76%;
  }
  75% {
    left: 36%;
    top: 62%;
  }
  100% {
    left: 4%;
    top: 74%;
  }
}

@keyframes fly-e {
  0% {
    left: 2%;
    top: 10%;
  }
  25% {
    left: 8%;
    top: 34%;
  }
  50% {
    left: 1%;
    top: 56%;
  }
  75% {
    left: 12%;
    top: 76%;
  }
  100% {
    left: 2%;
    top: 10%;
  }
}

@keyframes open-letter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (min-width: 900px) {
  .sky {
    min-height: 440px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dove,
  .dove img {
    animation: none !important;
  }

  .dove.fly-a {
    left: 20%;
    top: 8%;
  }
  .dove.fly-b {
    left: 76%;
    top: 30%;
  }
  .dove.fly-c {
    left: 40%;
    top: 45%;
  }
  .dove.fly-d {
    left: 30%;
    top: 76%;
  }
  .dove.fly-e {
    left: 4%;
    top: 50%;
  }
}
</style>
