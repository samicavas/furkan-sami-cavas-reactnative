import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { CategoryModel, CategorySnapshotOut } from "../category/category"
import { CategoryApi } from "../../services/api/category-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty categoriess
 */
export const CategoryStoreModel = types
  .model("CategoriesStore")
  .props({
    categories: types.optional(types.array(CategoryModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveCategories: (categoriesSnapshots: CategorySnapshotOut[]) => {
      self.categories.replace(categoriesSnapshots)
    },
  }))
  .actions((self) => ({
    getCategories: async () => {
      const categoriesApi = new CategoryApi(self.environment.api)
      const result = await categoriesApi.getCategories()

      if (result.kind === "ok") {
        self.saveCategories(result.categories)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    async isPressed() {
      await self.categories.map((val) => (val.pressed = true))
    },
  }))
  .actions((self) => ({
    async isNoPressed() {
      await self.categories.map((val) => (val.pressed = false))
    },
  }))

export interface CategoryStore extends Instance<typeof CategoryStoreModel> {}
export interface CategoryStoreSnapshotOut extends SnapshotOut<typeof CategoryStoreModel> {}
export interface CategoryStoreSnapshotIn extends SnapshotIn<typeof CategoryStoreModel> {}
export const createCategoryStoreDefaultModel = () => types.optional(CategoryStoreModel, {})
