import { ref, computed } from 'vue'

type Product = {
  id: number
  name: string
  price: number
}

const cart = ref<Product[]>([])

export const useCart = () => {
  const addToCart = (product: Product) => {
    cart.value.push(product)
  }

  const removeFromCart = (index: number) => {
    cart.value.splice(index, 1)
  }

  const total = computed(() =>
    cart.value.reduce((sum, p) => sum + p.price, 0)
  )

  return {
    cart,
    addToCart,
    removeFromCart,
    total
  }
}