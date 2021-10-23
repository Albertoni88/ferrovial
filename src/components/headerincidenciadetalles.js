import React from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants";
import SVG from "./svg";
import { statusBarHeitgh } from "../constants/theme";

const windowWidth = Dimensions.get("window").width;

export default function HeaderIncidenciaDetalles({ navigation, filtrar }) {
  return (
    <View style={styles.containerWebView}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View
          style={{
            width: 25,
            marginLeft: 12,
            padding: 0,
          }}
        >
          <SVG nombre={"VolverPrimario"} width={20} height={20} />
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
            color: COLORS.primary,
          }}
        >
          Valdepeñas
        </Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerSVGBack: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // left: 15,
    marginLeft: (windowWidth * 4) / 100,
    zIndex: 1111111,
    width: 22,
    height: 18,
    borderStyle: "solid",
    borderColor: COLORS.primary,
  },
  containerSVGSubir: {
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    left: -15,
    marginLeft: 10,
    zIndex: 1111111,
    width: 22,
    height: 25,
    borderStyle: "solid",
    borderColor: COLORS.primary,
  },
  containerWebView: {
    marginTop: statusBarHeitgh,
    width: "100%",
    zIndex: 9999,
    // backgroundColor: COLORS.primary,
    height: 54,
    flexDirection: "row",
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#c7c4c4",
    color: "#424242",
    textAlign: "center",
    borderRadius: 10,
    width: 250,
  },
  iconBackContainer: {
    backgroundColor: "white",
    height: 60,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
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
