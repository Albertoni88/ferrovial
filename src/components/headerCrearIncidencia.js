import React from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";
import { COLORS } from "../constants";
import SVG from "../components/svg";
import { statusBarHeitgh } from "../constants/theme";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HeaderCrearIncidencia({ navigation, were, closemap }) {
  return (
    <View style={styles.containerWebView}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        onPress={() => {
          if (were === "back") {
            navigation.goBack();
          } else {
            closemap();
          }
        }}
      >
        <View
          style={{
            width: 25,
            marginLeft: 12,
            padding: 0,
          }}
        >
          <SVG nombre={"VolverBlanco"} width={20} height={20} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 2,
        }}
      >
        <Text
          style={{
            fontFamily: "nunito-bold",
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "normal",
            textAlign: "center",
            color: "white",
          }}
        >
          Crear incidencia
        </Text>
      </View>
      <View style={{ flex: 1 }} />
      {/* <Text style={{
                    flex : 0.35,
                    //width: 76,
                    height: 27,
                    fontFamily: 'nunito-bold',
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "right",
                    color: 'white',
                    marginTop : 17
                    // textDecorationLine : 'underline'
                }}>
                    1
                </Text>
                <Text style={{
                    // flex: 0,
                    //width: 76,
                    height: 27,
                    fontFamily: 'nunito-bold',
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "right",
                    color: "rgba(255, 255, 255, 0.4)",
                    marginRight : 12,
                    marginTop : 17
                }}>
                    /1
                </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  containerSVG: {
    zIndex: 1111111,
    width: 20,
    height: 20,
    borderStyle: "solid",
    borderColor: COLORS.primary,
  },
  goBack: {
    //position: 'absolute',
    //marginTop: 20,
    // marginLeft: 12,
    // marginTop: (windowHeight * 10) / 100,
    // marginLeft: (windowWidth * 4.3) / 100,
    marginTop: 50,
    marginLeft: (windowWidth * 4.3) / 100,
    width: 30,
    height: 30,
  },
  containerWebView: {
    marginTop: statusBarHeitgh,
    width: "100%",
    zIndex: 9999,
    // backgroundColor: COLORS.primary,
    height: 54,
    flexDirection: "row",
  },
  iconBackContainer: {
    //marginTop : 10,
    backgroundColor: COLORS.primary,
    height: 80,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    // borderColor : 'white',
    // borderWidth: 3
  },
  close: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 30,
    top: 5,
  },
  logo: {
    width: "25%",
    height: "60%",
    marginTop: 10,
    resizeMode: "contain",
    marginLeft: 120,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
