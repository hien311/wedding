export function scrollToSection(id: string) {
  if (!import.meta.client) return
  const el = document.getElementById(id.replace(/^#/, ''))
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** In-page nav without leaving #hash in the URL (avoids jump on reload). */
export function onSectionClick(event: Event, href: string) {
  if (!href.startsWith('#')) return
  event.preventDefault()
  scrollToSection(href)
}

export function useResetScrollOnEntry() {
  onMounted(() => {
    if (!import.meta.client) return
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.scrollTo(0, 0)
  })
}
