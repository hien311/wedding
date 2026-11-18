<script setup lang="ts">
import { HERO_SLIDES, heroSrc } from '~/utils/photos'

const { wedding } = useAppConfig()
const slides = HERO_SLIDES.map((id) => heroSrc(id))
const active = ref(0)
const reduceMotion = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function next() {
  active.value = (active.value + 1) % slides.length
}

function go(index: number) {
  active.value = index
  if (timer) {
    clearInterval(timer)
    timer = setInterval(next, 5200)
  }
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion.value || slides.length < 2) return
  timer = setInterval(next, 5200)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-media" aria-hidden="true">
      <img
        v-for="(src, index) in slides"
        :key="src"
        :src="src"
        alt=""
        width="1200"
        height="1800"
        :fetchpriority="index === 0 ? 'high' : 'low'"
        :loading="index === 0 ? 'eager' : 'lazy'"
        decoding="async"
        class="slide"
        :class="{ active: index === active, motion: !reduceMotion && index === active }"
      />
      <div class="hero-shade" />
    </div>

    <div class="hero-content">
      <p class="eyebrow">{{ wedding.tagline }}</p>
      <h1>
        <span>{{ wedding.groom }}</span>
        <em>&</em>
        <span>{{ wedding.bride }}</span>
      </h1>
      <p class="date">{{ wedding.dateLabel }}</p>
      <div class="cta">
        <a class="btn btn-primary" href="#guest" @click="onSectionClick($event, '#guest')">
          Xác nhận tham dự
        </a>
        <a class="btn btn-ghost" href="#gallery" @click="onSectionClick($event, '#gallery')">
          Xem ảnh cưới
        </a>
      </div>
    </div>

    <div v-if="slides.length > 1" class="dots" role="tablist" aria-label="Ảnh hero">
      <button
        v-for="(_, index) in slides"
        :key="index"
        type="button"
        role="tab"
        :aria-selected="index === active"
        :aria-label="`Ảnh ${index + 1}`"
        :class="{ active: index === active }"
        @click="go(index)"
      />
    </div>

    <a
      class="scroll"
      href="#story"
      aria-label="Cuộn xuống"
      @click="onSectionClick($event, '#story')"
    >
      <span />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100dvh;
  color: var(--ivory);
  display: grid;
  place-items: end center;
  overflow: hidden;
}

.hero-media {
  position: absolute;
  inset: 0;
  background: #14201a;
}

.slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 32%;
  opacity: 0;
  transform: scale(1.04);
  transition: opacity 1.1s var(--ease);
  will-change: opacity;
}

.slide.active {
  opacity: 1;
  z-index: 1;
}

.slide.motion {
  animation: kenburns 5.2s var(--ease) forwards;
}

.hero-shade {
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(
      180deg,
      rgba(14, 24, 18, 0.35) 0%,
      rgba(14, 24, 18, 0.08) 32%,
      rgba(14, 24, 18, 0.72) 78%,
      rgba(14, 24, 18, 0.9) 100%
    ),
    radial-gradient(ellipse at 50% 70%, transparent 20%, rgba(14, 24, 18, 0.35) 100%);
}

.hero-content {
  position: relative;
  z-index: 3;
  width: min(720px, calc(100% - 2rem));
  text-align: center;
  padding-bottom: clamp(5.5rem, 15vh, 8rem);
}

.eyebrow {
  margin: 0 0 0.9rem;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  opacity: 0.9;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(3.4rem, 14vw, 6.4rem);
  line-height: 0.95;
  letter-spacing: 0.02em;
  display: grid;
  gap: 0.15rem;
}

h1 em {
  font-style: italic;
  font-size: 0.42em;
  opacity: 0.85;
  color: var(--gold);
}

.date {
  margin: 1.15rem 0 0;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  opacity: 0.92;
}

.cta {
  margin-top: 1.6rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.dots {
  position: absolute;
  left: 50%;
  bottom: 4.2rem;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 0.45rem;
}

.dots button {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(247, 243, 236, 0.35);
  transition: width 0.35s var(--ease), background 0.25s ease;
}

.dots button.active {
  width: 22px;
  background: var(--ivory);
}

.scroll {
  position: absolute;
  left: 50%;
  bottom: 1.2rem;
  transform: translateX(-50%);
  z-index: 3;
  width: 24px;
  height: 38px;
  border: 1px solid rgba(247, 243, 236, 0.45);
  border-radius: 999px;
  display: grid;
  place-items: start center;
  padding-top: 8px;
}

.scroll span {
  width: 4px;
  height: 8px;
  border-radius: 999px;
  background: var(--ivory);
  animation: drip 1.6s ease-in-out infinite;
}

@keyframes kenburns {
  from {
    transform: scale(1.04);
  }
  to {
    transform: scale(1);
  }
}

@keyframes drip {
  0%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(10px);
  }
}

@media (min-width: 900px) {
  .slide {
    object-position: center 36%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide {
    transition: none;
    transform: none;
  }

  .slide.motion {
    animation: none;
  }
}
</style>
