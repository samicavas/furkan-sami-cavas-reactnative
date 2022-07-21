import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Product } from "../../models/product/product"
import { Category } from "../../models/category/category"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetProductsResult = { kind: "ok"; products: Product[] } | GeneralApiProblem
export type GetProductResult = { kind: "ok"; product: Product } | GeneralApiProblem

export type GetCategoriesResult = { kind: "ok"; categories: Category[] } | GeneralApiProblem
export type GetCategoryResult = { kind: "ok"; category: Category } | GeneralApiProblem
