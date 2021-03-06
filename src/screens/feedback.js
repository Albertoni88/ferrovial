import React, { useState, useEffect, createRef } from "react";
import { useSelector as useReduxSelector } from "react-redux";
import {
  Dimensions,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import SideBarHeader from "../components/sideBarHeader";
import { COLORS } from "../constants";
import { getCSRFToken, saveFeedBack } from "../store/actions/userActions";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Feedback({ navigation, props }) {
  const myRef = createRef();
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [CSRF, setCSRF] = useState("");
  const token = useReduxSelector((state) => state.user.access_token);

  useEffect(() => {
    getCSRFToken()
      .then((response) => {
        setCSRF(response.data);
      })
      .catch((error) => {});
  }, []);

  const pressOut = () => {
    myRef.current.blur();
  };
  const guardarFeedBack = async () => {
    if (asunto !== "" && descripcion !== "") {
      const data = {
        webform_id: "feedback",
        subject: asunto,
        message: descripcion,
        acepta_la_politica_de_privacidad: 1,
      };
      saveFeedBack(data, token, CSRF)
        .then((response) => {
          if (response.status === 200) {
            alert("Guardado con éxito");
            setAsunto("");
            setDescripcion("");
          }
        })
        .catch((error) => {});
    } else {
      alert("Tiene campos vacíos");
    }
  };
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <>
      <SideBarHeader texto={"Feedback"} navigation={navigation} />
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            textAlign: "center",
            alignItems: "center",
            height: windowHeight - 108, //108 es el height del SideBarHeader
          }}
        >
          <View
            style={{
              //   alignContent: "center",
              //   flexDirection: "row",
              //   marginTop: 16,
              //   // marginBottom : 158,
              //   marginBottom: (windowHeight * 19.5) / 100,
              flex: 1,
              alignContent: "center",
            }}
          >
            <View style={{ marginTop: (windowHeight * 1.9) / 100 }}>
              <Text
                style={{
                  width: 351,
                  height: 44,
                  fontFamily: "nunito-semibold",
                  fontSize: 16,
                  fontWeight: "600",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  textAlign: "center",
                  color: COLORS.browngrey,
                }}
              >
                Si crees que hay algo que pueda ayudarnos a mejorar, cuéntanos…
              </Text>
            </View>
          </View>
          <View
            style={{
              //   marginTop: 5,
              //   flexDirection: "column"
              flex: 3,
              justifyContent: "center",
              marginBottom: 54, //este es la mitad del height del SideBarHeader
            }}
          >
            <TextInput
              value={asunto}
              placeholder={"Asunto"}
              placeholderTextColor={"white"}
              style={styles.inputuser}
              onChangeText={(asunto) => {
                setAsunto(asunto);
              }}
            />
            <TextInput
              ref={myRef}
              onBlur={pressOut}
              value={descripcion}
              multiline={true}
              numberOfLines={4}
              placeholder={"Descripción"}
              placeholderTextColor={"white"}
              style={styles.descripcion}
              onChangeText={(descripcion) => {
                setDescripcion(descripcion);
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                guardarFeedBack();
              }}
              style={{
                // marginTop: (windowHeight * 27) / 100,
                //   marginTop: (windowHeight * 48) / 100,
                marginBottom: 20,
                alignItems: "center",
                alignContent: "center",
                alignSelf: "center",
                justifyContent: "center",
                width: 114,
                height: 44,
                borderRadius: 22,
                backgroundColor: COLORS.primary,
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowRadius: 10,
                shadowOpacity: 1,
              }}
            >
              <Text
                style={{
                  width: Platform.OS === "ios" ? 71 : 80,
                  height: 24,
                  fontFamily: "nunito-bold",
                  fontSize: 18,
                  fontWeight: "bold",
                  fontStyle: "normal",
                  letterSpacing: 0.45,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  checkbox: {
    alignSelf: "center",
  },
  goBack: {
    marginTop: 30,
    textAlign: "left",
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  logo: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  inputuser: {
    // marginTop: 75,
    // width: 300,
    // color: 'white',
    // height: 50,
    // fontSize: 15,
    // borderRadius: 10,
    // backgroundColor: 'grey',

    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 290,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dfdfdf",
    marginBottom: 8,
  },
  descripcion: {
    // marginTop: 15,
    // width: 300,
    // color: 'white',
    // height: 150,
    // fontSize: 15,
    // borderRadius: 10,
    // backgroundColor: 'grey',

    textAlign: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: 290,
    height: 148,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dfdfdf",
    // marginBottom: (windowHeight * 22) / 100,
  },
  inputpass: {
    marginTop: 20,
    width: 300,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    height: 50,
    fontSize: 15,
    borderRadius: 10,
    backgroundColor: "brown",
    borderColor: "white",
    borderWidth: 2,
  },
});
