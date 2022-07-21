import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty Products model.
 */
export const ProductModel = types.model("Product").props({
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  price: types.optional(types.union(types.maybeNull(types.number), types.maybeNull(types.string))), //because they are entering the string
  category: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
  developerEmail: types.maybeNull(types.string),
  isLoading: types.maybeNull(types.boolean),
})

export interface Product extends Instance<typeof ProductModel> {}
export interface ProductSnapshotOut extends SnapshotOut<typeof ProductModel> {}
export interface ProductSnapshotIn extends SnapshotIn<typeof ProductModel> {}
export const createProductDefaultModel = () => types.optional(ProductModel, {})
