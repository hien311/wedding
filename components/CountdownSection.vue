<script setup lang="ts">
const { wedding } = useAppConfig()
</script>

<template>
  <section id="countdown" class="section countdown">
    <div class="container">
      <div class="intro reveal">
        <p class="section-label">Đếm ngược</p>
        <h2 class="section-title">Hai ngày đáng nhớ</h2>
        <p class="section-lead">13.12 cơm thân mật · 14.12 lễ thành hôn</p>
      </div>

      <div class="boards">
        <CountdownBoard
          v-for="item in wedding.countdowns"
          :key="item.id"
          :title="item.title"
          :at="item.at"
          :date-label="item.dateLabel"
          :time-label="item.timeLabel"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.countdown {
  padding-top: clamp(2.5rem, 6vw, 4rem);
  padding-bottom: clamp(2.5rem, 6vw, 4rem);
}

.intro {
  text-align: center;
  margin-bottom: 1.75rem;
}

.section-lead {
  margin-inline: auto;
}

.boards {
  display: grid;
  gap: 1rem;
}

@media (min-width: 820px) {
  .boards {
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }
}
</style>
