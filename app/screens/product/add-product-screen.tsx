/* eslint-disable no-unused-expressions */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import {
  Keyboard,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Text, Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"
import { TextInput } from "react-native-paper"
import { useStores } from "../../models"
import { ScrollView } from "react-native-gesture-handler"
import { Formik } from "formik"
import * as Yup from "yup"
const axios = require("axios").default
const ValidateSchema = Yup.object().shape({
  name: Yup.string().required("Requried"),
  price: Yup.number().typeError("you must specify a number").required("Requried"),
  description: Yup.string().required("Requried"),
  avatar: Yup.string().required("Requried"),
})

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: "black",
}
const FORM: ViewStyle = {
  padding: spacing[4],
}
const MARGINBOTTOM: ViewStyle = {
  marginBottom: 10,
}
const SELECTEDCATEGORY: TextStyle = {
  color: "black",
  paddingVertical: 10,
}
const BUTTON: ViewStyle = {
  justifyContent: "flex-end",
  alignItems: "center",
  position: "absolute",
  bottom: 0,
  alignSelf: "center",
  zIndex: 2,
}
const BUTTON_CONTENT: ViewStyle = {
  width: 100,
  height: 35,
  borderRadius: 5,
  marginBottom: 15,
  backgroundColor: "black",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 10,
  shadowRadius: 2,
  elevation: 10,
}
export const AddProductScreen: FC<StackScreenProps<NavigatorParamList, "addProduct">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const [SelectedCategory, setSelectedCategory] = React.useState("")

    const { CategoryStore } = useStores()
    const { categories } = CategoryStore
    function postProduct(value) {
      if (SelectedCategory) {
        axios
          .post("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/", {
            name: value.name,
            avatar: value.avatar,
            developerEmail: "test@gmail.com",
            price: +value.price,
            description: value.description,
            category: SelectedCategory,
          })
          .then(function (response) {
            return navigation.navigate("welcome", { param: response })
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        alert("Please select category")
      }
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <View testID="AddProductScreen" style={FULL}>
          <Screen style={CONTAINER} backgroundColor={"#f1f5f9"}>
            <Header
              headerTx="AddProduct.title"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            <Formik
              validationSchema={ValidateSchema}
              initialValues={{ name: "", price: "", description: "", avatar: "" }}
              onSubmit={(values) => postProduct(values)}
            >
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <>
                  <View style={FORM}>
                    <TextInput
                      label="Product Title"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={() => setFieldTouched("name")}
                      mode="outlined"
                      underlineColor="white"
                      activeOutlineColor="black"
                      outlineColor={errors.name && touched.name ? "red" : "gray"}
                      style={MARGINBOTTOM}
                    />
                    {touched.name && errors.name && (
                      <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.name}</Text>
                    )}
                    <TextInput
                      label="Price"
                      value={values.price}
                      onChangeText={handleChange("price")}
                      onBlur={() => setFieldTouched("price")}
                      mode="outlined"
                      keyboardType="numeric"
                      underlineColor="white"
                      outlineColor={errors.price && touched.price ? "red" : "gray"}
                      activeOutlineColor="black"
                      style={MARGINBOTTOM}
                    />
                    {touched.price && errors.price && (
                      <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.price}</Text>
                    )}
                    <TextInput
                      label="Description"
                      value={values.description}
                      onChangeText={handleChange("description")}
                      onBlur={() => setFieldTouched("description")}
                      mode="outlined"
                      underlineColor="white"
                      activeOutlineColor="black"
                      outlineColor={errors.description && touched.description ? "red" : "gray"}
                      multiline={true}
                      numberOfLines={4}
                      style={MARGINBOTTOM}
                    />
                    {touched.description && errors.description && (
                      <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.description}</Text>
                    )}
                    <TextInput
                      label="Image Link"
                      value={values.avatar}
                      onChangeText={handleChange("avatar")}
                      onBlur={() => setFieldTouched("avatar")}
                      mode="outlined"
                      underlineColor="white"
                      activeOutlineColor="black"
                      outlineColor={errors.avatar && touched.avatar ? "red" : "gray"}
                      style={MARGINBOTTOM}
                    />
                    {touched.avatar && errors.avatar && (
                      <Text style={{ fontSize: 12, color: "#FF0D10" }}>{errors.avatar}</Text>
                    )}
                    <Text style={SELECTEDCATEGORY}>Selected Category : {SelectedCategory}</Text>
                  </View>
                  <View style={{ height: 80 }}>
                    <ScrollView horizontal={true}>
                      {categories.map((ent) => (
                        <View key={ent.id}>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedCategory(ent.name)
                            }}
                          >
                            <View
                              style={{
                                height: 35,
                                paddingVertical: 6,
                                paddingHorizontal: 5,
                                margin: 10,
                                borderWidth: !ent.pressed ? 0 : 2,
                                borderColor: !ent.pressed ? "#f1f5f9" : "black",
                                backgroundColor: !ent.pressed ? "black" : "white",
                                borderRadius: 5,
                                shadowColor: "#000",
                                shadowOffset: { width: 2, height: 2 },
                                shadowOpacity: 10,
                                shadowRadius: 2,
                                elevation: 10,
                              }}
                            >
                              <Text
                                style={{
                                  color: !ent.pressed ? "white" : "black",
                                  paddingHorizontal: 5,
                                  letterSpacing: 1.4,
                                }}
                              >
                                {ent.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                  <TouchableOpacity onPress={handleSubmit} style={BUTTON}>
                    <View style={BUTTON_CONTENT}>
                      <Text style={{ color: "white" }}>Add Product</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </Screen>
        </View>
      </TouchableWithoutFeedback>
    )
  },
)
