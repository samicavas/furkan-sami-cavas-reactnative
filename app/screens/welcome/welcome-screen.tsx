/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, AutoImage as Image } from "../../components"

import Ionicons from "react-native-vector-icons/Ionicons"
import { spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { ScrollView } from "react-native-gesture-handler"
import useFetch from "../../hooks/useFetch"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const FULL: ViewStyle = { flex: 1, backgroundColor: "#f1f5f9" }
const CONTAINER: ViewStyle = {
  backgroundColor: "#f1f5f9",
}
const container2: ViewStyle = {
  alignContent: "center",
  flex: 3,
  height: windowHeight,
  justifyContent: "center",
  width: windowWidth,
  zIndex: 5,
}
const FOOTER_CONTENT: ViewStyle = {
  backgroundColor: "transparent",
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  alignItems: "flex-end",
  position: "absolute",
  bottom: 0,
  alignSelf: "flex-end",
}
const IMAGE: ImageStyle = {
  height: 150,
  width: 150,
  alignItems: "center",
}
export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation, route }) => {
    const add = () => navigation.navigate("addProduct")
    useFetch()
    const { productStore } = useStores()
    const { products } = productStore
    const { CategoryStore } = useStores()
    const { categories } = CategoryStore

    const [refreshing, setRefreshing] = React.useState(false)
    const [pressed, setPressed] = useState(false)
    const [SelectedCategory, setSelectedCategory] = useState("")
    let filteredProducts = []

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
    }, [])
    useEffect(() => {
      async function fetchData() {
        await productStore.getProducts()
        await CategoryStore.getCategories()
        setRefreshing(false)
      }

      fetchData()
    }, [refreshing, route?.params?.param, products])
    if (SelectedCategory !== "") {
      filteredProducts = products.filter((item) => item.category === SelectedCategory)
    } else {
      filteredProducts = products
    }

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <Screen style={CONTAINER} backgroundColor={"#f1f5f9"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              shadowColor: "#000",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 10,
              shadowRadius: 2,
              elevation: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 24,
                  color: "black",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  letterSpacing: 1.5,
                  padding: spacing[4],
                }}
              >
                UPayments Store
              </Text>
            </View>
            <View>
              <Ionicons style={{ padding: spacing[5] }} name="search" color={"#000"} size={20} />
            </View>
          </View>
          <View>
            <ScrollView horizontal={true}>
              <TouchableOpacity
                onPress={() => {
                  setPressed(!pressed)
                  setSelectedCategory("")
                }}
              >
                <View
                  style={{
                    height: 35,
                    paddingVertical: 6,
                    paddingHorizontal: 5,
                    margin: 10,
                    borderWidth: pressed ? 0 : 2,
                    borderColor: pressed ? "#f1f5f9" : "black",
                    backgroundColor: pressed ? "black" : "white",
                    borderRadius: 5,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 10,
                    shadowRadius: 2,
                    elevation: 10,
                  }}
                >
                  <Text
                    style={{
                      color: pressed ? "white" : "black",
                      paddingHorizontal: 5,
                      letterSpacing: 1.4,
                    }}
                  >
                    All
                  </Text>
                </View>
              </TouchableOpacity>
              {categories.map((ent) => (
                <View key={ent.id}>
                  <TouchableOpacity
                    onPress={() => {
                      setPressed(true)
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
          {/* <Header headerTx="welcomeScreen.header" titleStyle={HEADER_TITLE} rightIcon="bullet" /> */}
          {!products[0]?.isLoading ? (
            <ScrollView
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    paddingBottom: 8,
                  }}
                >
                  {filteredProducts.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        width: windowWidth / 2 - 16,
                        height: 200,
                        margin: spacing[2],
                        marginVertical: spacing[2],
                        borderRadius: 10,
                        elevation: 2,
                        backgroundColor: "white",
                        shadowColor: "#000",
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 10,
                        shadowRadius: 1,
                      }}
                    >
                      {item.avatar ? (
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                          <Image source={{ uri: item?.avatar }} style={IMAGE} />
                        </View>
                      ) : (
                        <View style={{ height: 150 }}></View>
                      )}
                      <TouchableOpacity
                        onPress={() => navigation.navigate("detail", { id: item.id })}
                      >
                        <View
                          style={{
                            backgroundColor: "black",
                            height: 50,
                            borderRadius: 10,
                            // shadowColor: "#000",
                            // shadowOffset: { width: 0, height: 2 },
                            // shadowOpacity: 10,
                            // shadowRadius: 2,
                            // elevation: 10,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <View style={{ paddingLeft: 4 }}>
                              <Text numberOfLines={1} style={{ padding: 2 }}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                paddingLeft: 4,
                                paddingRight: 4,
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ padding: 2 }}>${item?.price}</Text>

                              <View>
                                <Ionicons
                                  style={{ padding: 2 }}
                                  name="pencil-sharp"
                                  color={"#fff"}
                                  size={14}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          ) : (
            <Screen style={container2}>
              <ActivityIndicator color={"#000"} size={"large"} />
            </Screen>
          )}
          <View style={FOOTER_CONTENT}>
            <TouchableOpacity
              onPress={() => add()}
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "black",
                alignItems: "center",
                justifyContent: "center",
                elevation: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 10,
                shadowRadius: 2,
              }}
            >
              <Ionicons name="add" color={"#000"} size={35} />
            </TouchableOpacity>
          </View>
        </Screen>
      </View>
    )
  },
)
