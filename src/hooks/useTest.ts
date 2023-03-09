import { ref } from 'vue'

export function useTest() {
  const testName = ref(false)
  return {
    testName,
  }
}
