export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function calc(targetMs: number): CountdownParts {
  const diff = Math.max(0, targetMs - Date.now())
  const done = diff === 0
  const totalSec = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    done,
  }
}

export function useCountdown(isoDate: MaybeRefOrGetter<string>) {
  const targetMs = computed(() => new Date(toValue(isoDate)).getTime())
  const parts = ref<CountdownParts>(calc(targetMs.value))
  let timer: ReturnType<typeof setInterval> | undefined

  function tick() {
    parts.value = calc(targetMs.value)
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 1000)
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
  })

  return parts
}

export function padTime(n: number) {
  return String(n).padStart(2, '0')
}
