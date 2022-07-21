import { CategoryModel } from "./category"

test("can be created", () => {
  const instance = CategoryModel.create({
    id: "17",
    name: "Title",
  })

  expect(instance).toBeTruthy()
})
