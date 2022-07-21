import { ProductModel } from "./product"

test("can be created", () => {
  const instance = ProductModel.create({
    id: "17",
    name: "Title",
    price: 100,
    category: "Electronic",
    description: "Description",
    avatar:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-max-blue-select?wid=470&hei=556&fmt=png-alpha&.v=1645552346295",
    developerEmail: "developerEmail 17",
  })

  expect(instance).toBeTruthy()
})
