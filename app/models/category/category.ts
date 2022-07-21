import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty Categories model.
 */
export const CategoryModel = types.model("Category").props({
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  pressed: types.maybeNull(types.boolean),
})

export interface Category extends Instance<typeof CategoryModel> {}
export interface CategorySnapshotOut extends SnapshotOut<typeof CategoryModel> {}
export interface CategorySnapshotIn extends SnapshotIn<typeof CategoryModel> {}
export const createCategoryDefaultModel = () => types.optional(CategoryModel, {})
