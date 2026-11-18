<script setup lang="ts">
const { wedding } = useAppConfig()

const groomSide = computed(() => ({
  ...wedding.families.groom,
  child: wedding.groomFull,
}))

const brideSide = computed(() => ({
  ...wedding.families.bride,
  child: wedding.brideFull,
}))
</script>

<template>
  <section id="family" class="section family-section">
    <div class="container">
      <div class="intro reveal is-visible">
        <p class="section-label">Thông gia</p>
        <h2 class="section-title">Nhà trai & nhà gái</h2>
        <p class="section-lead">
          Trân trọng báo tin đến họ hàng, bạn bè gần xa.
        </p>
      </div>

      <div class="card reveal is-visible">
        <div class="side">
          <span class="label">{{ groomSide.label }}</span>
          <p class="parent">{{ groomSide.father }}</p>
          <p class="parent">{{ groomSide.mother }}</p>
          <p class="child">{{ groomSide.child }}</p>
        </div>

        <div class="divider" aria-hidden="true">
          <em>&</em>
        </div>

        <div class="side">
          <span class="label">{{ brideSide.label }}</span>
          <p class="parent">{{ brideSide.father }}</p>
          <p class="parent">{{ brideSide.mother }}</p>
          <p class="child">{{ brideSide.child }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.family-section {
  position: relative;
  z-index: 2;
  padding-top: clamp(3rem, 7vw, 4.5rem);
}

.intro {
  text-align: center;
  margin-bottom: 1.75rem;
}

.section-lead {
  margin-inline: auto;
}

.card {
  display: grid;
  gap: 1.25rem;
  padding: clamp(1.5rem, 4vw, 2.4rem);
  border-radius: 28px;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(232, 239, 230, 0.75)),
    radial-gradient(500px 240px at 100% 0%, rgba(184, 149, 108, 0.14), transparent 60%);
  border: 1px solid rgba(26, 47, 36, 0.08);
  box-shadow: var(--shadow-soft);
  text-align: center;
}

.side {
  display: grid;
  gap: 0.25rem;
}

.label {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.parent {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3.4vw, 1.55rem);
  color: var(--forest);
  font-weight: 500;
  line-height: 1.35;
}

.child {
  margin: 0.85rem 0 0;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(26, 47, 36, 0.1);
  font-size: 0.95rem;
  color: var(--muted);
  font-weight: 600;
}

.divider {
  display: grid;
  place-items: center;
  color: var(--gold);
}

.divider em {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.8rem;
  line-height: 1;
}

@media (min-width: 760px) {
  .card {
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1.5rem;
  }

  .divider {
    height: 100%;
    padding: 0 0.5rem;
    position: relative;
  }

  .divider::before {
    content: '';
    position: absolute;
    top: 12%;
    bottom: 12%;
    left: 50%;
    width: 1px;
    background: rgba(26, 47, 36, 0.12);
    transform: translateX(-50%);
  }

  .divider em {
    position: relative;
    z-index: 1;
    background: linear-gradient(160deg, #f7f3ec, #e8efe6);
    padding: 0.35rem 0.45rem;
  }
}
</style>
