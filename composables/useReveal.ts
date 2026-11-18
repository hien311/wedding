export function useReveal() {
  onMounted(() => {
    if (import.meta.server) return

    const nodes = document.querySelectorAll<HTMLElement>('.reveal')
    if (!nodes.length) return

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((el) => observer.observe(el))

    onBeforeUnmount(() => observer.disconnect())
  })
}
