import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ProductModel, ProductSnapshotOut } from "../product/product"
import { ProductApi } from "../../services/api/product-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty productss
 */
export const ProductStoreModel = types
  .model("ProductsStore")
  .props({
    products: types.optional(types.array(ProductModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveProducts: (productsSnapshots: ProductSnapshotOut[]) => {
      self.products.replace(productsSnapshots)
    },
  }))
  .actions((self) => ({
    getProducts: async () => {
      const productsApi = new ProductApi(self.environment.api)
      const result = await productsApi.getProducts()

      if (result.kind === "ok") {
        self.saveProducts(result.products)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    async isLoad() {
      await self.products.map((val) => (val.isLoading = true))
    },
  }))
  .actions((self) => ({
    async isNoLoad() {
      await self.products.map((val) => (val.isLoading = false))
    },
  }))

export interface ProductStore extends Instance<typeof ProductStoreModel> {}
export interface ProductStoreSnapshotOut extends SnapshotOut<typeof ProductStoreModel> {}
export interface ProductStoreSnapshotIn extends SnapshotIn<typeof ProductStoreModel> {}
export const createProductStoreDefaultModel = () => types.optional(ProductStoreModel, {})
