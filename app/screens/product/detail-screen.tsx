/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC } from "react"
import { TextStyle, View, ViewStyle, ImageStyle, Dimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, AutoImage as Image } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
  color: "black",
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  color: "black",
  lineHeight: 15,
  textAlign: "center",
}
const ratio = windowWidth / 541
const IMAGE: ImageStyle = {
  width: windowWidth,
  height: 362 * ratio,
}

export const DetailScreen: FC<StackScreenProps<NavigatorParamList, "detail">> = observer(
  ({ navigation, route }) => {
    const goBack = () => navigation.goBack()
    const id = route?.params?.id as string
    const { productStore } = useStores()
    const { products } = productStore
    const product = products.find((item) => item.id === id)
    return (
      <View testID="DetailScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed" backgroundColor={"#f1f5f9"}>
          <Header
            headerTx="Detail.title"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={{ uri: product?.avatar }} style={IMAGE} />
          </View>
          <View style={{ height: 100 }}></View>
          <View
            style={{
              height: windowHeight,
              shadowColor: "#000",
              shadowOffset: {
                width: 2,
                height: 20,
              },
              shadowOpacity: 1,
              shadowRadius: 160,

              elevation: 24,
              zIndex: 999,
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                height: windowHeight,
                borderRadius: 20,
                padding: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{product.name}</Text>
                <Text style={{ fontWeight: "bold" }}>${product.price}</Text>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ fontSize: 12 }}>{product.description}</Text>
              </View>
            </View>
          </View>
        </Screen>
      </View>
    )
  },
)
