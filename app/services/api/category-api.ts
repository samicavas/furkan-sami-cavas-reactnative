import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetCategoriesResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class CategoryApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getCategories(): Promise<GetCategoriesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/",
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const categories = response.data

      return { kind: "ok", categories }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
