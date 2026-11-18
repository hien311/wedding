<script setup lang="ts">
const open = ref(false)
const links = [
  { href: '#countdown', label: 'Đếm ngược' },
  { href: '#story', label: 'Lời mời' },
  { href: '#event', label: 'Sự kiện' },
  { href: '#family', label: 'Thông gia' },
  { href: '#gallery', label: 'Ảnh cưới' },
  { href: '#guest', label: 'Xác nhận' },
]

function close() {
  open.value = false
}

function go(event: Event, href: string) {
  onSectionClick(event, href)
  close()
}
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <a href="#top" class="brand" @click="go($event, '#top')">H & H</a>
      <button
        class="menu-btn"
        type="button"
        :aria-expanded="open"
        aria-controls="nav-panel"
        @click="open = !open"
      >
        <span class="sr-only">Menu</span>
        <span class="bar" :class="{ open }" />
      </button>
      <nav id="nav-panel" class="links" :class="{ open }" aria-label="Điều hướng">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="go($event, link.href)">
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 40;
  padding: 0.85rem 0;
  background: linear-gradient(180deg, rgba(20, 32, 26, 0.55), transparent);
  color: var(--ivory);
}

.nav-inner {
  width: min(1080px, calc(100% - 1.5rem));
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  font-family: var(--font-display);
  font-size: 1.35rem;
  letter-spacing: 0.08em;
  font-weight: 500;
}

.links {
  display: none;
  gap: 1.1rem;
  font-size: 0.86rem;
  font-weight: 500;
}

.links a {
  opacity: 0.88;
}

.links a:hover {
  opacity: 1;
}

.menu-btn {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(247, 243, 236, 0.28);
  background: rgba(26, 47, 36, 0.28);
  display: grid;
  place-items: center;
}

.bar,
.bar::before,
.bar::after {
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--ivory);
  position: relative;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.bar::before,
.bar::after {
  content: '';
  position: absolute;
  left: 0;
}

.bar::before {
  top: -5px;
}

.bar::after {
  top: 5px;
}

.bar.open {
  background: transparent;
}

.bar.open::before {
  transform: translateY(5px) rotate(45deg);
}

.bar.open::after {
  transform: translateY(-5px) rotate(-45deg);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 859px) {
  .links.open {
    display: grid;
    position: absolute;
    top: calc(100% + 0.35rem);
    right: 0.75rem;
    left: 0.75rem;
    padding: 1rem;
    border-radius: 16px;
    background: rgba(20, 32, 26, 0.94);
    backdrop-filter: blur(12px);
    box-shadow: var(--shadow-soft);
  }

  .links.open a {
    padding: 0.7rem 0.4rem;
    border-bottom: 1px solid rgba(247, 243, 236, 0.08);
  }

  .links.open a:last-child {
    border-bottom: 0;
  }
}

@media (min-width: 860px) {
  .menu-btn {
    display: none;
  }

  .links {
    display: flex;
  }
}
</style>
