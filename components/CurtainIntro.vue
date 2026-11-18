<script setup lang="ts">
const STORAGE_KEY = 'wedding-curtain-seen-v3'

type Spark = {
  id: number
  left: string
  delay: string
  duration: string
  color: string
  dx: string
  dy: string
  size: string
}

const visible = ref(false)
const opening = ref(false)
const celebrating = ref(false)
const gone = ref(false)
const sparks = ref<Spark[]>([])

const COLORS = ['#B8956C', '#F7F3EC', '#6D7F6C', '#E8B4B8', '#F2D27A', '#FFFFFF', '#1A2F24']

function finish() {
  gone.value = true
  visible.value = false
  celebrating.value = false
  document.documentElement.classList.remove('curtain-locked')
}

function spawnFireworks() {
  const next: Spark[] = []
  for (let i = 0; i < 48; i++) {
    const angle = (Math.PI * 2 * i) / 48 + (Math.random() - 0.5) * 0.4
    const dist = 28 + Math.random() * 48
    next.push({
      id: i,
      left: `${42 + Math.random() * 16}%`,
      delay: `${Math.random() * 180}ms`,
      duration: `${900 + Math.random() * 700}ms`,
      color: COLORS[i % COLORS.length],
      dx: `${Math.cos(angle) * dist}vw`,
      dy: `${Math.sin(angle) * dist * 0.7 - 8}vh`,
      size: `${5 + Math.random() * 7}px`,
    })
  }
  // second burst
  for (let i = 0; i < 28; i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = 18 + Math.random() * 36
    next.push({
      id: 100 + i,
      left: `${30 + Math.random() * 40}%`,
      delay: `${220 + Math.random() * 260}ms`,
      duration: `${800 + Math.random() * 600}ms`,
      color: COLORS[(i + 3) % COLORS.length],
      dx: `${Math.cos(angle) * dist}vw`,
      dy: `${Math.sin(angle) * dist * 0.75 - 12}vh`,
      size: `${4 + Math.random() * 6}px`,
    })
  }
  sparks.value = next
}

function openCurtain() {
  if (opening.value || gone.value) return
  opening.value = true
  celebrating.value = true
  spawnFireworks()

  if (!import.meta.dev) {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.setTimeout(finish, reduce ? 0 : 2100)
}

onMounted(() => {
  if (import.meta.server) return

  const params = new URLSearchParams(window.location.search)
  const force = params.get('intro') === '1'

  let seen = false
  if (!import.meta.dev && !force) {
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      seen = false
    }
  }

  if (seen) {
    gone.value = true
    return
  }

  visible.value = true
  document.documentElement.classList.add('curtain-locked')
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('curtain-locked')
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible && !gone"
      class="curtain-intro"
      :class="{ opening, celebrating }"
      role="dialog"
      aria-modal="true"
      aria-label="Mở thiệp mời"
    >
      <div class="mist-bg" aria-hidden="true" />

      <div class="stage">
        <div class="rail" aria-hidden="true" />

        <div class="curtain left" aria-hidden="true">
          <div class="panel">
            <span v-for="n in 8" :key="`l-${n}`" class="pleat" />
            <div class="hem">
              <span v-for="n in 9" :key="`lh-${n}`" class="tassel" />
            </div>
          </div>
        </div>
        <div class="curtain right" aria-hidden="true">
          <div class="panel">
            <span v-for="n in 8" :key="`r-${n}`" class="pleat" />
            <div class="hem">
              <span v-for="n in 9" :key="`rh-${n}`" class="tassel" />
            </div>
          </div>
        </div>

        <div class="actor groom">
          <img
            src="/images/chibi/groom.webp"
            alt="Chibi chú rể"
            width="320"
            height="320"
            decoding="async"
          />
        </div>
        <div class="actor bride">
          <img
            src="/images/chibi/bride.webp"
            alt="Chibi cô dâu"
            width="320"
            height="320"
            decoding="async"
          />
        </div>

        <div class="center-copy" :class="{ hide: opening }">
          <p class="eyebrow">Trân trọng kính mời</p>
          <p class="names">Gia Hiến <em>&</em> Thanh Hiền</p>
          <button class="btn btn-primary open-btn" type="button" @click="openCurtain">
            Kéo màn xem thiệp
          </button>
        </div>

        <div v-if="celebrating" class="fireworks" aria-hidden="true">
          <span
            v-for="spark in sparks"
            :key="spark.id"
            class="spark"
            :style="{
              left: spark.left,
              width: spark.size,
              height: spark.size,
              background: spark.color,
              animationDelay: spark.delay,
              animationDuration: spark.duration,
              '--dx': spark.dx,
              '--dy': spark.dy,
            }"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.curtain-intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: hidden;
}

.mist-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.7), transparent 52%),
    linear-gradient(180deg, #dce6ec 0%, #f3f6f8 42%, #e7efe9 100%);
}

.stage {
  position: relative;
  width: 100%;
  height: 100%;
}

.rail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 18px;
  z-index: 8;
  background: linear-gradient(180deg, #e8d5b0 0%, #b8956c 45%, #8d6b3d 100%);
  box-shadow: 0 8px 18px rgba(80, 60, 30, 0.22);
}

.curtain {
  position: absolute;
  top: 10px;
  bottom: 0;
  width: 52%;
  z-index: 2;
  pointer-events: none;
  transition: transform 1.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  filter: drop-shadow(0 10px 24px rgba(70, 90, 100, 0.18));
}

.curtain.left {
  left: 0;
}

.curtain.right {
  right: 0;
}

.panel {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  overflow: hidden;
  border-radius: 0 0 42% 42% / 0 0 3.5% 3.5%;
  background: linear-gradient(180deg, #ffffff 0%, #f4f8fb 55%, #e4eef3 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.85),
    inset -10px 0 28px rgba(170, 190, 205, 0.28),
    0 18px 40px rgba(90, 110, 120, 0.12);
}

.curtain.right .panel {
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.85),
    inset 10px 0 28px rgba(170, 190, 205, 0.28),
    0 18px 40px rgba(90, 110, 120, 0.12);
}

.pleat {
  display: block;
  height: 100%;
  background:
    linear-gradient(
      90deg,
      rgba(170, 190, 205, 0.45) 0%,
      rgba(255, 255, 255, 0.95) 28%,
      rgba(255, 255, 255, 0.55) 52%,
      rgba(190, 210, 220, 0.5) 100%
    );
  box-shadow: inset -6px 0 10px rgba(140, 165, 180, 0.22);
}

/* Đuôi rèm gắn liền đáy panel */
.hem {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  align-items: end;
  padding: 0 2%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(210, 224, 232, 0.55));
  border-top: 1px solid rgba(180, 200, 210, 0.35);
  pointer-events: none;
}

.tassel {
  justify-self: center;
  width: 70%;
  max-width: 28px;
  height: 22px;
  border-radius: 0 0 40% 40%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(205, 220, 228, 0.9) 60%, rgba(180, 200, 210, 0.85));
  box-shadow: inset 0 -4px 8px rgba(150, 175, 190, 0.35);
}

.actor {
  position: absolute;
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 5;
  width: min(48vw, 250px);
  display: grid;
  justify-items: center;
  filter: drop-shadow(0 12px 18px rgba(40, 55, 48, 0.25));
}

.actor img {
  width: 100%;
  height: auto;
  display: block;
  background: transparent;
}

.actor.groom {
  left: 3%;
}

.actor.bride {
  right: 3%;
}

.center-copy {
  position: absolute;
  inset: 0;
  z-index: 6;
  display: grid;
  place-content: center;
  text-align: center;
  color: var(--forest);
  padding: 1.5rem;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.center-copy.hide {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.eyebrow {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 700;
}

.names {
  margin: 0.7rem 0 1.2rem;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 9vw, 3.6rem);
  font-weight: 500;
  line-height: 1;
}

.names em {
  font-style: italic;
  color: var(--gold);
  font-size: 0.55em;
  margin: 0 0.15em;
}

.open-btn {
  pointer-events: auto;
  justify-self: center;
}

.fireworks {
  position: absolute;
  inset: 0;
  z-index: 9;
  pointer-events: none;
  overflow: hidden;
}

.spark {
  position: absolute;
  top: 46%;
  border-radius: 999px;
  opacity: 0;
  animation-name: boom;
  animation-timing-function: cubic-bezier(0.15, 0.75, 0.25, 1);
  animation-fill-mode: forwards;
  box-shadow: 0 0 10px currentColor;
}

.opening .curtain.left {
  transform: translateX(-105%);
}

.opening .curtain.right {
  transform: translateX(105%);
}

.opening .actor.groom {
  animation: exit-groom 1.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.opening .actor.bride {
  animation: exit-bride 1.45s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes exit-groom {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  12% {
    transform: translate(-14px, -12px) rotate(-10deg);
  }
  24% {
    transform: translate(-36px, 6px) rotate(8deg);
  }
  40% {
    transform: translate(-80px, -10px) rotate(-9deg);
  }
  58% {
    transform: translate(-150px, 8px) rotate(7deg);
  }
  78% {
    transform: translate(-240px, -4px) rotate(-6deg);
  }
  100% {
    transform: translate(-115vw, 12px) rotate(-10deg);
    opacity: 0;
  }
}

@keyframes exit-bride {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  12% {
    transform: translate(14px, -12px) rotate(10deg);
  }
  24% {
    transform: translate(36px, 6px) rotate(-8deg);
  }
  40% {
    transform: translate(80px, -10px) rotate(9deg);
  }
  58% {
    transform: translate(150px, 8px) rotate(-7deg);
  }
  78% {
    transform: translate(240px, -4px) rotate(6deg);
  }
  100% {
    transform: translate(115vw, 12px) rotate(10deg);
    opacity: 0;
  }
}

@keyframes boom {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.4);
  }
  12% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(0.2);
  }
}

@media (min-width: 760px) {
  .actor {
    width: min(28vw, 280px);
  }

  .actor.groom {
    left: 7%;
  }

  .actor.bride {
    right: 7%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .actor,
  .curtain,
  .spark {
    animation: none !important;
  }

  .curtain {
    transition: none;
  }
}
</style>

<style>
html.curtain-locked,
html.curtain-locked body {
  overflow: hidden;
}
</style>
