<script setup lang="ts">
const { wedding } = useAppConfig()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p class="names">{{ wedding.groomFull }} & {{ wedding.brideFull }}</p>
      <p class="note">Cảm ơn bạn đã ở bên chúng mình.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3rem 0 2.5rem;
  text-align: center;
  color: var(--forest);
}

.names {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 500;
}

.note {
  margin: 0.5rem 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}
</style>
