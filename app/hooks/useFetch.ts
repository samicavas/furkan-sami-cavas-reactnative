import { useEffect } from "react"
import { useStores } from "../models"
export default function useFetch() {
  const { productStore } = useStores()
  const { products } = productStore

  useEffect(() => {
    async function fetchData() {
      if (products) {
        await productStore.isLoad()
      }
      await productStore.getProducts()
      await productStore.isNoLoad()
    }
    fetchData()
  }, [])

  return { products }
}
