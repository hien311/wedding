<script setup lang="ts">
import { GALLERY_ORDER, gallerySrc, thumbSrc } from '~/utils/photos'

const photos = GALLERY_ORDER
const active = ref<string | null>(null)

function open(id: string) {
  active.value = id
}

function close() {
  active.value = null
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section id="gallery" class="section">
    <div class="container">
      <div class="intro reveal">
        <p class="section-label">Khoảnh khắc</p>
        <h2 class="section-title">Ảnh cưới</h2>
        <p class="section-lead">Một vài khung hình chúng mình muốn gửi đến bạn.</p>
      </div>

      <div class="grid">
        <button
          v-for="(id, index) in photos"
          :key="id"
          type="button"
          class="shot reveal"
          :style="{ transitionDelay: `${Math.min(index, 8) * 40}ms` }"
          @click="open(id)"
        >
          <img
            :src="thumbSrc(id)"
            :alt="`Ảnh cưới ${index + 1}`"
            width="400"
            height="600"
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="active" class="lightbox" role="dialog" aria-modal="true" @click.self="close">
        <button class="close" type="button" aria-label="Đóng" @click="close">×</button>
        <img :src="gallerySrc(active as any)" alt="Ảnh phóng to" width="900" height="1350" />
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.intro {
  margin-bottom: 2rem;
}

.grid {
  columns: 2;
  column-gap: 0.75rem;
}

.shot {
  width: 100%;
  margin: 0 0 0.75rem;
  padding: 0;
  break-inside: avoid;
  border-radius: 16px;
  overflow: hidden;
  display: block;
  background: var(--mist);
}

.shot img {
  width: 100%;
  height: auto;
  transition: transform 0.7s var(--ease);
}

.shot:hover img {
  transform: scale(1.04);
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(10, 16, 13, 0.92);
  display: grid;
  place-items: center;
  padding: 1rem;
}

.lightbox img {
  max-height: min(90dvh, 1100px);
  width: auto;
  max-width: 100%;
  border-radius: 12px;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(247, 243, 236, 0.12);
  color: var(--ivory);
  font-size: 1.6rem;
  line-height: 1;
}

@media (min-width: 760px) {
  .grid {
    columns: 3;
    column-gap: 1rem;
  }

  .shot {
    margin-bottom: 1rem;
  }
}

@media (min-width: 1100px) {
  .grid {
    columns: 4;
  }
}
</style>
