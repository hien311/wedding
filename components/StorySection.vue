<script setup lang="ts">
const { wedding } = useAppConfig()
</script>

<template>
  <section id="story" class="section story">
    <div class="container layout">
      <div class="copy reveal">
        <p class="section-label">Lời mời</p>
        <h2 class="section-title">Một ngày để nhớ mãi</h2>
        <p class="section-lead">{{ wedding.inviteText }}</p>
        <p class="names">
          {{ wedding.groomFull }} <span>&</span> {{ wedding.brideFull }}
        </p>
      </div>
      <figure class="frame reveal">
        <img
          :src="wedding.storyImage"
          :alt="`${wedding.groom} và ${wedding.bride}`"
          width="900"
          height="1350"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.copy {
  order: 2;
}

.names {
  margin: 1.5rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: var(--forest);
}

.names span {
  color: var(--gold);
  font-style: italic;
  margin: 0 0.25rem;
}

.frame {
  margin: 0;
  order: 1;
  border-radius: 22px 22px 48px 22px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  aspect-ratio: 3 / 4;
}

.frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 860px) {
  .layout {
    grid-template-columns: 0.95fr 1.05fr;
    gap: 3.5rem;
  }

  .copy {
    order: 1;
  }

  .frame {
    order: 2;
  }
}
</style>
