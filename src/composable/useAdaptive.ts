import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)
export function useAdaptive() {
  function handleResize() {
    const width = window.innerWidth
    isMobile.value = width <= 768
  }

  handleResize()

  onMounted(() => window.addEventListener('resize', handleResize))
  onUnmounted(() => window.removeEventListener('resize', handleResize))

  return { isMobile }
}
