<script setup lang="ts">
const { wedding } = useAppConfig()
</script>

<template>
  <section id="event" class="section event">
    <div class="container">
      <div class="intro reveal">
        <p class="section-label">Sự kiện</p>
        <h2 class="section-title">Lịch trình hai ngày</h2>
        <p class="section-lead">
          Hai mốc quan trọng — xem giờ, ngày và địa điểm liền mạch bên dưới.
        </p>
      </div>

      <div class="events reveal">
        <article
          v-for="item in wedding.events"
          :key="item.title"
          class="event-card"
          :class="{ featured: item.featured }"
        >
          <div class="calendar" aria-hidden="true">
            <span class="month">Thg {{ item.month }}</span>
            <strong class="day">{{ item.day }}</strong>
          </div>
          <div class="body">
            <p class="badge">{{ item.title }}</p>
            <p class="when">
              <span class="time">{{ item.time }}</span>
              <span class="sep">·</span>
              <span>{{ item.date }}</span>
            </p>
            <p class="note">{{ item.note }}</p>
          </div>
        </article>
      </div>

      <div class="venue-block reveal">
        <div class="venue">
          <span>Địa điểm</span>
          <strong>{{ wedding.venue }}</strong>
          <p>{{ wedding.address }}</p>
        </div>

        <div class="map-wrap">
          <iframe
            class="map"
            :src="wedding.mapEmbedUrl"
            title="Bản đồ tư gia nhà trai"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          />
          <div class="map-actions">
            <a
              class="btn btn-primary map-link"
              :href="wedding.mapUrl"
              target="_blank"
              rel="noopener"
            >
              Mở Google Maps
            </a>
            <a class="btn btn-map" href="#guest" @click="onSectionClick($event, '#guest')">
              Gửi xác nhận
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.event::before {
  content: '';
  position: absolute;
  inset: 4% 0 auto;
  height: 92%;
  background:
    linear-gradient(135deg, rgba(26, 47, 36, 0.94), rgba(36, 61, 50, 0.9)),
    url('/images/thumb/MIN04755.webp') center / cover;
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
  color: var(--ivory);
  padding: clamp(2.2rem, 5vw, 3.2rem);
  border-radius: 28px;
}

.intro .section-title,
.intro .section-lead {
  color: var(--ivory);
}

.intro .section-lead {
  opacity: 0.86;
}

.events {
  margin-top: 1.75rem;
  display: grid;
  gap: 1rem;
}

.event-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1.1rem;
  border-radius: 20px;
  background: rgba(247, 243, 236, 0.12);
  border: 1px solid rgba(247, 243, 236, 0.22);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
}

.event-card.featured {
  background: linear-gradient(145deg, rgba(247, 243, 236, 0.96), rgba(232, 239, 230, 0.92));
  color: var(--forest);
  border-color: rgba(247, 243, 236, 0.85);
}

.calendar {
  width: 72px;
  border-radius: 14px;
  overflow: hidden;
  text-align: center;
  background: rgba(26, 47, 36, 0.92);
  color: var(--ivory);
  flex-shrink: 0;
}

.event-card.featured .calendar {
  background: var(--forest);
}

.month {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.4rem 0.25rem 0.25rem;
  background: rgba(184, 149, 108, 0.95);
  color: #1a2f24;
  font-weight: 700;
}

.day {
  display: block;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
  padding: 0.55rem 0 0.65rem;
}

.badge {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 4vw, 1.75rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--gold);
}

.event-card.featured .badge {
  color: var(--forest);
}

.when {
  margin: 0.45rem 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
  font-size: 0.95rem;
  opacity: 0.92;
}

.time {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.sep {
  opacity: 0.5;
}

.note {
  margin: 0.55rem 0 0;
  font-size: 0.9rem;
  line-height: 1.45;
  opacity: 0.82;
}

.venue-block {
  margin-top: 1.5rem;
  padding-top: 1.35rem;
  border-top: 1px solid rgba(247, 243, 236, 0.18);
  display: grid;
  gap: 1.1rem;
}

.venue span {
  display: block;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 0.35rem;
}

.venue strong {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.35rem, 3.5vw, 1.7rem);
  line-height: 1.3;
}

.venue p {
  margin: 0.4rem 0 0;
  opacity: 0.9;
  max-width: 36rem;
}

.map-wrap {
  display: grid;
  gap: 0.85rem;
}

.map {
  width: 100%;
  height: min(42vw, 260px);
  min-height: 200px;
  border: 0;
  border-radius: 18px;
  background: rgba(0, 0, 0, 0.2);
}

.map-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn-map {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  border: 1px solid rgba(247, 243, 236, 0.35);
  color: var(--ivory);
  font-weight: 600;
}

@media (min-width: 760px) {
  .events {
    grid-template-columns: 1fr 1fr;
    gap: 1.15rem;
  }

  .map {
    height: 280px;
  }
}
</style>
