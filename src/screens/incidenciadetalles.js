import React, { useState, useEffect, useRef } from "react";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import {
  Modal,
  Dimensions,
  ImageBackground,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import * as Progress from "react-native-progress";
import HeaderIncidenciaDetalles from "../components/headerincidenciadetalles";
import { COLORS } from "../constants";
import SVG from "../components/svg";
import { Camera } from "expo-camera";
import {
  guardarImagen,
  guardarComentario,
  editarComentario,
  cargarIncidenciaDetalles,
  borrarComentario,
  favoritoComentario,
} from "../store/actions/incidenciaActions";
import { setFavoritoRdux, getCSRFToken } from "../store/actions/userActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function IncidenciaDetalles({
  navigation,
  props,
  route,
  incidencia,
}) {
  useEffect(() => {
    cargarIncidenciaDetalles(token, route.params.incidencia.id)
      .then((response) => {
        if (response.status === 200) {
          var auxiliar = [];
          response.data.comentarios.forEach((element) => {
            auxiliar.push(element.imagenes[0].id);
          });
          setImagenesFront(auxiliar);
          setListadoComentarios(response.data.comentarios);
          setCommentEditar(Array(response.data.comentarios.length).fill(false));
        }
      })
      .catch((error) => {});

    //onHandlePermission();

    getCSRFToken()
      .then((response) => {
        setCSRF(response.data);
      })
      .catch((error) => {});
  }, []);

  const dispatch = useReduxDispatch();
  const [imagenesfront, setImagenesFront] = useState(new Array());
  const [listadoComentarios, setListadoComentarios] = useState([]);
  const token = useReduxSelector((state) => state.user.access_token);
  const [votado, setVotado] = useState(false);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  // Tipo1
  const [votoChoice, setVotoChoice] = useState([1, 1]);
  const [votoMarcado, setVotoMarcado] = useState([0, 0]);
  // Tipo1

  // Tipo2
  const [votoChoiceBarras, setVotoChoiceBarras] = useState([1, 1, 1, 1, 1]);
  const [votoMarcadoBarras, setVotoMarcadoBarras] = useState([0, 0, 0, 0, 0]);
  // Tipo2
  // Tipo3
  const [firmado, setFirmado] = useState(false);
  // Tipo3
  // Tipo4
  const [apoyado, setApoyado] = useState(false);
  // Tipo4

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [camera, showCamera] = useState(false);
  const [photo, setPhoto] = useState("");
  const cameraRef = useRef();
  const user = useReduxSelector((state) => state.user.userInfo);
  const [activo, setActivo] = useState(-1);
  const [commentEditar, setCommentEditar] = useState([]);
  const [editado, setEditado] = useState("");
  const [CSRF, setCSRF] = useState("");
  const favoritosRedux = useReduxSelector((state) => state.user.favoritosRedux);

  const toggleFavoritoMethod = async () => {
    var incidencia_id = route.params.incidencia.id;

    favoritoComentario(token, CSRF, incidencia_id)
      .then((response) => {
        //setFavorito(response.data.favorito);
        dispatch(
          setFavoritoRdux({
            value: response.data.favorito,
            indice: route.params.indice,
          })
        );
      })
      .catch((error) => {});
  };

  const editarComentarioFront = (index, id, body) => {
    setEditado(body);
    var marcados = [];
    if (commentEditar[index] === false) {
      commentEditar.forEach((element, i) => {
        if (i !== index) {
          marcados.push(false);
        } else {
          marcados.push(true);
          setActivo(index);
        }
      });
      setCommentEditar(marcados);
    } else {
      var nuevos = [];
      var idEditado = -1;
      if (activo === index) {
        listadoComentarios.forEach((element1, j) => {
          if (index === j) {
            var copia = { ...element1, comment_body: editado };
            idEditado = copia.id;
            nuevos.push(copia);
          } else {
            nuevos.push(element1);
          }
        });
        var im = [];
        im.push(imagenesfront[index]);
        var data = {
          subject: editado,
          comment_body: editado,
          imagenes: im,
        };
        editarComentario(token, data, idEditado)
          .then((response) => {
            if (response.status === 200) {
              setListadoComentarios(nuevos);
            }
          })
          .catch((error) => {});
      }

      setCommentEditar(Array(commentEditar.length).fill(false));
    }
  };
  const onHandlePermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.2, base64: true };
      const data = await cameraRef.current
        .takePictureAsync(options)
        .then(async (photo) => {
          setIsPreview(false);
          setPhoto(photo.base64);
          Alert.alert(
            "Foto",
            "Desea esta foto?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Si",
                onPress: () => {
                  showCamera(false);
                  guardarComentarioFront();
                },
              },
            ],
            { cancelable: false }
          );
          // setTomadaFoto(true);
        });
    }
  };
  const guardarComentarioFront = () => {
    var d = new Date();
    var n = d.getMilliseconds();
    const generatedNombre =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      n;

    if (comment !== "") {
      var imagenes = [];
      imagenes.push({
        filename: generatedNombre,
        tipemime: "image/png",
        base64: photo,
      });
      guardarImagen(token, imagenes).then((response) => {
        if (response.status === 200) {
          var idArchivo = response.data[0];
          var data = {
            subject: comment,
            comment_body: comment,
            imagenes: [idArchivo],
          };
          guardarComentario(token, data, route.params.incidencia.id).then(
            (response) => {
              if (response.status === 200) {
                var temp = {
                  ...data,
                  uid: user.id,
                  autor_fullname: user.username + " " + user.apellidos,
                  autor_username: user.username,
                  subject: comment,
                  comment_body: comment,
                  imagenes: [idArchivo],
                };
                data = temp;

                // Adicionando los comentarios en app
                var coms = [];
                listadoComentarios.forEach((it) => {
                  coms.push(it);
                });
                coms.push(data);
                setListadoComentarios(coms);
                // Adicionando los ids de las imagenes de los comentarios en app
                var images = [];
                imagenesfront.forEach((ele) => {
                  images.push(ele);
                });
                images.push(response.data.id);
                // Adicionando los false | true de los comentarios activados en app
                var commentEditarNews = [];
                commentEditar.forEach((cedi) => {
                  commentEditarNews.push(cedi);
                });
                commentEditarNews.push(false);
                setCommentEditar(commentEditarNews);

                setImagenesFront(images);
                setComment("");
                alert("Se guardó correctamente el comentario");
              } else {
                alert("Hubo error al subir el comentario");
              }
            }
          );
        } else {
          alert("Hubo error al subir la imagen");
        }
      });
    } else {
      alert("Comentario vacío");
    }
  };
  const eliminarComentario = (idComentario, uid) => {
    Alert.alert(
      "Borrar comentario",
      "Desea borrar este comentario?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        // { text: 'Yes', onPress: () => BackHandler.exitApp() },
        {
          text: "Si",
          onPress: () => {
            if (uid === user.id) {
              borrarComentario(token, idComentario)
                .then((response) => {
                  if (response.status === 200) {
                    var listNueva = [];

                    listadoComentarios.forEach((element) => {
                      if (element.id !== idComentario) {
                        listNueva.push(element);
                      }
                    });
                    setListadoComentarios(listNueva);
                  } else {
                    alert("Hubo un error al borrar el comentario");
                  }
                })
                .catch((error) => {});
            } else {
              alert("No fuistes el que hizo el comentario");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {showModal === false && (
        <HeaderIncidenciaDetalles navigation={navigation} />
      )}
      {showModal === false && camera === false && (
        <ScrollView
          style={{
            marginTop: 8,
          }}
        >
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              //navigation.navigate('IncidenciaDetalles', { incidencia: incidencia });
            }}
          >
            <ImageBackground
              //source={require('../assets/1.png')}
              source={{ uri: route.params.incidencia.imagen }}
              style={styles.imageContainer}
              imageStyle={styles.image}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    width: 95,
                    height: 24,
                    opacity: 0.9,
                    borderRadius: 12,
                    backgroundColor: COLORS.primary,
                    alignSelf: "center",
                    marginLeft: 8,
                    marginTop: 8,
                  }}
                >
                  <Feather
                    onPress={() => {}}
                    style={{
                      alignSelf: "center",
                      marginLeft: 8,
                    }}
                    name="calendar"
                    color="white"
                    size={15}
                  />
                  <Text
                    style={{
                      textAlign: "left",
                      width: 65,
                      height: 14,
                      fontFamily: "nunito-regular",
                      fontSize: 10,
                      fontWeight: "normal",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      color: "white",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    {route.params.incidencia.created}
                  </Text>
                </View>
                {/* {
                                        favoritosRedux[route.params.indice] === 0 &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                toggleFavoritoMethod();
                                            }}
                                            style={styles.containerSVGheart}>
                                            <SVG nombre={'Corazon'} width={25} height={25} />
                                        </TouchableOpacity>
                                    }
                                    {
                                        favoritosRedux[route.params.indice] === 1 &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                toggleFavoritoMethod();
                                            }}
                                            style={styles.containerSVGheart}>
                                            <SVG nombre={'CorazonRelleno'} width={25} height={25} />
                                        </TouchableOpacity>
                                    } */}
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            {/* <TouchableOpacity
                                onPress={() => {

                                }}
                                style={{
                                    marginLeft: 12,
                                    marginTop: 5,
                                    marginRight : 5
                                }}
                            >
                                <SVG nombre={'Ubicacion'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 15,
                                marginTop: 8,
                                fontFamily: "nunito-regular",
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: COLORS.browngrey
                            }}>
                                {route.params.incidencia.autor_username}
                            </Text> */}
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginLeft: 12,
                marginTop: 5,
                marginRight: 5,
              }}
            >
              <SVG nombre={"CardUbicacion"} width={20} height={20} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                marginTop: 8,
                fontFamily: "nunito-regular",
                fontSize: 15,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: COLORS.browngrey,
              }}
            >
              {route.params.incidencia.estado}
            </Text>
            {/* <TouchableOpacity
                                onPress={() => {

                                }}
                                style={{
                                    marginLeft: 85,
                                    marginTop: 5,
                                    marginRight : 5
                                }}
                            >
                                <SVG nombre={'Ubicacion'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 15,
                                marginTop: 8,
                                fontFamily: "nunito-regular",
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: COLORS.browngrey
                            }}>
                                {route.params.incidencia.tipo_incidencia}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {

                                }}
                                style={{
                                    marginLeft: 12,
                                    marginTop: 5,
                                    marginRight : 5
                                }}
                            >
                                <SVG nombre={'Ubicacion'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 15,
                                marginTop: 8,
                                fontFamily: "nunito-regular",
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: COLORS.browngrey
                            }}>
                                {route.params.incidencia.estado}
                            </Text> */}
          </View>
          <View
            style={{
              alignSelf: "center",
              marginTop: 6,
              width: (windowWidth * 95.7) / 100,
              height: 1,
              opacity: 0.2,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: COLORS.browngrey,
            }}
          />
          <Text
            style={{
              width: (windowWidth * 93.6) / 100,
              height: 44,
              fontFamily: "nunito-semibold",
              fontSize: 16,
              fontWeight: "600",
              fontStyle: "normal",
              letterSpacing: 0,
              color: COLORS.primary,
              marginLeft: 12,
              marginTop: 7,
            }}
          >
            {route.params.incidencia.titulo}
            {/* Nombre de la incidencia que ocupa 2 líneas para tener el ejemplo en el diseño de la app */}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginLeft: 12,
                marginTop: 12,
                marginRight: 5,
              }}
            >
              <SVG nombre={"CardUbicacion"} width={20} height={20} />
            </TouchableOpacity>
            <Text
              style={{
                color: "grey",
                fontSize: 15,
                flex: 1,
                marginTop: 15,
              }}
            >
              {route.params.incidencia.direccion}
            </Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              marginTop: 6,
              width: (windowWidth * 95.7) / 100,
              height: 1,
              opacity: 0.2,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: COLORS.browngrey,
              marginBottom: 8,
            }}
          />
          <Text
            style={{
              width: 351,
              height: 95,
              fontFamily: "nunito-regular",
              fontSize: 14,
              fontWeight: "normal",
              fontStyle: "normal",
              letterSpacing: 0.16,
              color: COLORS.GREYISH_BROWN,
              marginLeft: 12,
            }}
          >
            {route.params.incidencia.description}
          </Text>
          {route.params.incidencia.estado === "Resuelta" &&
            route.params.incidencia.imagen_resuelta !== "" && (
              <View style={styles.container}>
                <ImageBackground
                  source={{ uri: route.params.incidencia.imagen_resuelta }}
                  style={styles.imageContainer}
                  imageStyle={styles.image}
                ></ImageBackground>
              </View>
            )}
          {/* <View
                            style={{
                                alignSelf: 'center',
                                marginTop: 43,
                                width: (windowWidth * 95.7) / 100,
                                height: 1,
                                opacity: 0.2,
                                borderStyle: "solid",
                                borderWidth: 1,
                                borderColor: COLORS.browngrey,
                                marginBottom: 8
                            }}
                        />
                        <View style={{ zIndex: 1111, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <TextInput
                                value={comment}
                                placeholder='Escribe un comentario...'
                                placeholderTextColor={COLORS.primary}
                                multiline={true}
                                numberOfLines={3}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                    textAlign: 'left',
                                    paddingLeft: 17,
                                    width: 351,
                                    height: 34,
                                    width: (windowWidth * 93.6) / 100,
                                    borderRadius: 20,
                                    backgroundColor: "rgba(77, 94, 225, 0.1)",
                                }}
                                onChangeText={(comment) => {
                                    setComment(comment)
                                }}
                            >
                            </TextInput>
                            <Icon
                                onPress={() => {
                                    if (comment === '') {
                                        alert("Escribe un comentario primero");
                                    } else {
                                        showCamera(true);
                                    }
                                }}
                                style={{
                                    marginLeft: -40,
                                    zIndex: 11111,
                                    //marginTop: 25,
                                    textAlign: 'right',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}
                                name="camera-outline"
                                color={COLORS.primary}
                                size={30}
                            />
                        </View> */}
          {/* {listadoComentarios.map((com, indice) => {

                            return (
                                <View key={indice} style={{
                                    alignSelf: 'center',
                                    marginTop: 12,
                                    height: (windowHeight * 9.35) / 100,
                                    width: (windowWidth * 93.6) / 100,
                                    borderRadius: 12,
                                    backgroundColor: 'white',
                                    shadowColor: "rgba(0, 0, 0, 0.2)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 0
                                    },
                                    shadowRadius: 15,
                                    shadowOpacity: 1,
                                    flexDirection: 'row',
                                }}>

                                    <Icon
                                        onPress={() => {

                                        }}
                                        style={{

                                            marginTop: 10,
                                            marginLeft: 14
                                        }}
                                        name="person-outline"
                                        color={COLORS.primary}
                                        size={20}
                                    />
                                    <Text
                                        style={{
                                            marginTop: 12,
                                            marginLeft: 4,
                                            width: 82,
                                            height: 19,
                                            fontFamily: "nunito-regular",
                                            fontSize: 14,
                                            fontWeight: "normal",
                                            fontStyle: "normal",
                                            letterSpacing: 0.16,
                                            color: COLORS.GREYISH_BROWN,
                                        }}
                                    >
                                        
                                        {com.autor_username}
                                    </Text>
                                    <Icon
                                        onPress={() => {
                                            editarComentarioFront(indice, com.id, com.comment_body)
                                        }}
                                        style={{
                                            
                                            marginTop: 15,
                                            textAlign: 'right',
                                            zIndex: 111111,
                                            marginRight: 4,
                                            marginLeft: 210
                                        }}
                                        name="construct-outline"
                                        color={COLORS.primary}
                                        size={20}
                                    />
                                    <Icon
                                        onPress={() => {
                                            eliminarComentario(com.id, com.uid);
                                        }}
                                        style={{
                                            zIndex: 111111,
                                            marginTop: 15,
                                            textAlign: 'left',
                                            marginRight: 7,
                                        }}
                                        name="trash-outline"
                                        color={COLORS.primary}
                                        size={20}
                                    />
                                    <View style={{ width: (windowWidth * 95.7) / 100, marginLeft: -377, alignSelf: 'center', flexDirection: 'row' }}>
                                        {
                                            commentEditar[indice] === false &&
                                            <Text
                                                style={{
                                                    textAlign: 'left',
                                                    left: 14,
                                                    marginTop: 45,
                                                    fontFamily: "nunito-regular",
                                                    fontSize: 14,
                                                    fontWeight: "normal",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0.16,
                                                    color: COLORS.GREYISH_BROWN,
                                                    top: -10
                                                }}
                                            >                                               
                                                {com.comment_body}
                                            </Text>
                                        }
                                        {
                                            commentEditar[indice] === true &&
                                            <TextInput
                                                value={editado}
                                                placeholder={'Comentario'}
                                                placeholderTextColor={COLORS.primary}
                                                style={styles.inputuser}
                                                onChangeText={(comentario) => {
                                                    setEditado(comentario)
                                                }}
                                            />
                                        }
                                    </View>
                                </View>
                            );
                        })} */}
          {/* Tipo 1            */}
          {votado === false && route.params.incidencia.tipo === 1 && (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('CrearIncidencia');
                setShowModal(true);
              }}
              style={{
                // alignItems: 'center',
                // zIndex: 11111,
                // borderRadius: 30,
                // backgroundColor: COLORS.primary,
                // width: 100,
                // height: 50

                justifyContent: "center",
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
                width: 93,
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
                  // fontSize: 20,
                  // color: 'white'

                  alignSelf: "center",
                  textAlign: "center",
                  alignItems: "center",
                  width: 50,
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
                Votar
              </Text>
            </TouchableOpacity>
          )}
          {votado === true && route.params.incidencia.tipo === 1 && (
            // <TouchableOpacity
            //     onPress={() => {
            //         // navigation.navigate('CrearIncidencia');
            //     }}
            //     style={{ borderWidth: 2, borderColor: COLORS.primary, alignSelf: 'center', position: 'absolute', bottom: 30, alignItems: 'center', zIndex: 11111, borderRadius: 30, justifyContent: 'center', backgroundColor: 'white', width: 150, height: 50 }}>
            //     <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: COLORS.primary }}> Ya has votado </Text>
            // </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('CrearIncidencia');
                setShowModal(true);
              }}
              style={{
                // alignItems: 'center',
                // zIndex: 11111,
                // borderRadius: 30,
                // backgroundColor: COLORS.primary,
                // width: 100,
                // height: 50

                justifyContent: "center",
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
                width: 93,
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
                  // fontSize: 20,
                  // color: 'white'

                  alignSelf: "center",
                  textAlign: "center",
                  alignItems: "center",
                  width: 50,
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
                Votar
              </Text>
            </TouchableOpacity>
          )}
          {/* Tipo 2            */}
          {votado === false && route.params.incidencia.tipo === 2 && (
            // <TouchableOpacity
            //     onPress={() => {
            //         // navigation.navigate('CrearIncidencia');
            //         setShowModal(true);
            //     }}
            //     style={{ alignSelf: 'center', position: 'absolute', bottom: 30, alignItems: 'center', zIndex: 11111, borderRadius: 30, justifyContent: 'center', backgroundColor: COLORS.primary, width: 100, height: 50 }}>
            //     <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'white' }}> Votar </Text>
            // </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('CrearIncidencia');
                setShowModal(true);
              }}
              style={{
                // alignItems: 'center',
                // zIndex: 11111,
                // borderRadius: 30,
                // backgroundColor: COLORS.primary,
                // width: 100,
                // height: 50

                justifyContent: "center",
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
                width: 93,
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
                  // fontSize: 20,
                  // color: 'white'

                  alignSelf: "center",
                  textAlign: "center",
                  alignItems: "center",
                  width: 50,
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
                Votar
              </Text>
            </TouchableOpacity>
          )}
          {votado === true && route.params.incidencia.tipo === 2 && (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('CrearIncidencia');
                setShowModal(true);
              }}
              style={{
                // alignItems: 'center',
                // zIndex: 11111,
                // borderRadius: 30,
                // backgroundColor: COLORS.primary,
                // width: 100,
                // height: 50

                justifyContent: "center",
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
                width: 93,
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
                  // fontSize: 20,
                  // color: 'white'

                  alignSelf: "center",
                  textAlign: "center",
                  alignItems: "center",
                  width: 50,
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
                Votar
              </Text>
            </TouchableOpacity>
          )}
          {/* Tipo 3            */}
          {firmado === false && route.params.incidencia.tipo === 3 && (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('CrearIncidencia');
                //setShowModal(true);
                setFirmado(true);
              }}
              style={{
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
                alignItems: "center",
                zIndex: 11111,
                borderRadius: 30,
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                width: 100,
                height: 50,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                {" "}
                Firmar{" "}
              </Text>
            </TouchableOpacity>
          )}
          {firmado === true && route.params.incidencia.tipo === 3 && (
            <TouchableOpacity
              disabled={true}
              onPress={() => {
                // navigation.navigate('CrearIncidencia');
              }}
              style={{
                shadowRadius: 5,
                shadowColor: "grey",
                shadowOpacity: 0.8,
                borderWidth: 2,
                borderColor: COLORS.primary,
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
                alignItems: "center",
                zIndex: 11111,
                borderRadius: 30,
                justifyContent: "center",
                backgroundColor: "white",
                width: 150,
                height: 50,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "grey",
                }}
              >
                {" "}
                Ya has firmado{" "}
              </Text>
            </TouchableOpacity>
          )}
          {/* Tipo 4            */}
          {apoyado === false && route.params.incidencia.tipo === 4 && (
            // <TouchableOpacity
            //     onPress={() => {
            //         // navigation.navigate('CrearIncidencia');
            //         //setShowModal(true);
            //         setApoyado(true)
            //     }}
            //     style={{ alignSelf: 'center', position: 'absolute', bottom: 30, alignItems: 'center', zIndex: 11111, borderRadius: 30, justifyContent: 'center', backgroundColor: COLORS.primary, width: 100, height: 50 }}>
            //     <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center', alignItems: 'center', color: 'white' }}> Apoyar </Text>
            // </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('CrearIncidencia');
                setApoyado(true);
              }}
              style={{
                // alignItems: 'center',
                // zIndex: 11111,
                // borderRadius: 30,
                // backgroundColor: COLORS.primary,
                // width: 100,
                // height: 50

                justifyContent: "center",
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
                width: 105,
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
                  // fontSize: 20,
                  // color: 'white'

                  alignSelf: "center",
                  textAlign: "center",
                  alignItems: "center",
                  width: 65,
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
                Apoyar
              </Text>
            </TouchableOpacity>
          )}
          {apoyado === true && route.params.incidencia.tipo === 4 && (
            <TouchableOpacity
              disabled={true}
              onPress={() => {
                // navigation.navigate('CrearIncidencia');
              }}
              style={{
                shadowRadius: 5,
                shadowColor: "grey",
                shadowOpacity: 0.8,
                borderWidth: 2,
                borderColor: COLORS.primary,
                alignSelf: "center",
                position: "absolute",
                bottom: 30,
                alignItems: "center",
                zIndex: 11111,
                borderRadius: 30,
                justifyContent: "center",
                backgroundColor: "white",
                width: 150,
                height: 50,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "grey",
                }}
              >
                {" "}
                Ya has apoyado{" "}
              </Text>
            </TouchableOpacity>
          )}
          {/* Segun tipo */}
          {route.params.incidencia.tipo === 1 && (
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 15, color: "red" }}>30%</Text>
              <View style={{ height: 25, marginTop: 5 }}>
                <Progress.Bar
                  unfilledColor={"green"}
                  style={{ marginHorizontal: 10 }}
                  color={"red"}
                  borderWidth={0}
                  progress={0.3}
                  width={300}
                  height={10}
                />
              </View>
              <Text style={{ fontSize: 15, color: "green" }}>70%</Text>
            </View>
          )}
          {route.params.incidencia.tipo === 2 && (
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: "green",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 25,
                  width: 65,
                  marginBottom: 3,
                }}
              >
                <Text style={{ fontSize: 15, color: "white" }}>A) 20%</Text>
              </View>
              <View
                style={{
                  marginLeft: 3,
                  borderRadius: 30,
                  backgroundColor: "blue",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 25,
                  width: 65,
                  marginBottom: 3,
                }}
              >
                <Text style={{ fontSize: 15, color: "white" }}>B) 6%</Text>
              </View>
              <View
                style={{
                  marginLeft: 3,
                  borderRadius: 30,
                  backgroundColor: "pink",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 25,
                  width: 65,
                  marginBottom: 3,
                }}
              >
                <Text style={{ fontSize: 15, color: "white" }}>C) 44%</Text>
              </View>
              <View
                style={{
                  marginLeft: 3,
                  borderRadius: 30,
                  backgroundColor: "orange",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 25,
                  width: 65,
                  marginBottom: 3,
                }}
              >
                <Text style={{ fontSize: 15, color: "white" }}>D) 19%</Text>
              </View>
              <View
                style={{
                  marginLeft: 3,
                  borderRadius: 30,
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 25,
                  width: 65,
                  marginBottom: 3,
                }}
              >
                <Text style={{ fontSize: 15, color: "white" }}>E) 11%</Text>
              </View>
            </View>
          )}
          {route.params.incidencia.tipo === 3 && (
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: "green",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 25,
                  width: 150,
                  marginBottom: 3,
                }}
              >
                <Text style={{ fontSize: 15, color: "white" }}>850 firmas</Text>
              </View>
            </View>
          )}
          {route.params.incidencia.tipo === 4 && (
            <View
              style={{
                justifyContent: "center",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 15, color: "blue" }}>50</Text>
              <View style={{ height: 25, marginTop: 5 }}>
                <Progress.Bar
                  unfilledColor={"green"}
                  style={{ marginHorizontal: 10 }}
                  color={"blue"}
                  borderWidth={0}
                  progress={0.3}
                  width={300}
                  height={10}
                />
              </View>
              <Text style={{ fontSize: 15, color: "green" }}>100</Text>
            </View>
          )}
        </ScrollView>
      )}
      {showModal && (
        // <View style={{ top: 10, height: '100%', width: '100%', borderColor: 'red', borderWidth: 3 }}>
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              onPress={() => {
                setShowModal(false);
              }}
              style={{
                marginTop: 20,
              }}
              name="chevron-back-outline"
              color={COLORS.primary}
              size={30}
            />
            <Text
              style={{
                fontWeight: "bold",
                flex: 0.9,
                textAlign: "center",
                color: COLORS.primary,
                marginTop: 25,
                fontSize: 20,
              }}
            >
              Qué quieres votar?
            </Text>
          </View>
          <View style={[styles.modalBackground]}>
            {route.params.incidencia.tipo === 1 && (
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    height: 100,
                    width: 100,
                    borderRadius: 60,
                    backgroundColor: votoChoice[0] === 1 ? "green" : "#d9dce4",
                    marginHorizontal: 5,
                  }}
                >
                  <Icon
                    onPress={() => {
                      MarcarVoto1(0);
                    }}
                    style={{
                      //marginTop: 20,
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      //textAlign: 'left',
                    }}
                    name="hand-left-outline"
                    color="white"
                    size={30}
                  />
                </View>
                <View
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    height: 100,
                    width: 100,
                    borderRadius: 60,
                    backgroundColor: votoChoice[1] === 1 ? "red" : "#d9dce4",
                    marginHorizontal: 5,
                    transform: [{ rotate: "180deg" }],
                  }}
                >
                  <Icon
                    onPress={() => {
                      MarcarVoto1(1);
                    }}
                    style={{
                      //marginTop: 20,
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      //textAlign: 'left',
                    }}
                    name="hand-left-outline"
                    color="white"
                    size={30}
                  />
                </View>
              </View>
            )}
            {route.params.incidencia.tipo === 2 && (
              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity
                  onPress={() => {
                    MarcarVoto2(0);
                  }}
                  style={{
                    alignSelf: "center",
                    borderRadius: 20,
                    justifyContent: "center",
                    backgroundColor:
                      votoChoiceBarras[0] === 1 ? "white" : "grey",
                    width: 380,
                    height: 50,
                    shadowRadius: 5,
                    shadowColor: "grey",
                    shadowOpacity: 0.8,
                    marginBottom: 5,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        marginTop: 15,
                        marginLeft: 5,
                        fontSize: 15,
                        textAlign: "left",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      Opción 1{" "}
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        marginRight: 5,
                        flex: 1,
                        fontSize: 15,
                        textAlign: "right",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      20%{" "}
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "green",
                        width: 20,
                        height: 50,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    MarcarVoto2(1);
                  }}
                  style={{
                    alignSelf: "center",
                    //alignItems: 'center',
                    borderRadius: 20,
                    justifyContent: "center",
                    backgroundColor:
                      votoChoiceBarras[1] === 1 ? "white" : "grey",
                    width: 380,
                    height: 50,
                    shadowRadius: 5,
                    shadowColor: "grey",
                    shadowOpacity: 0.8,
                    marginBottom: 5,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        marginTop: 15,
                        marginLeft: 5,
                        fontSize: 15,
                        textAlign: "left",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      Opción 2{" "}
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        marginRight: 5,
                        flex: 1,
                        fontSize: 15,
                        textAlign: "right",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      20%{" "}
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "blue",
                        width: 20,
                        height: 50,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    MarcarVoto2(2);
                  }}
                  style={{
                    alignSelf: "center",
                    //alignItems: 'center',
                    borderRadius: 20,
                    justifyContent: "center",
                    backgroundColor:
                      votoChoiceBarras[2] === 1 ? "white" : "grey",
                    width: 380,
                    height: 50,
                    shadowRadius: 5,
                    shadowColor: "grey",
                    shadowOpacity: 0.8,
                    marginBottom: 5,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        marginTop: 15,
                        marginLeft: 5,
                        fontSize: 15,
                        textAlign: "left",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      Opción 3{" "}
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        marginRight: 5,
                        flex: 1,
                        fontSize: 15,
                        textAlign: "right",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      20%{" "}
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "pink",
                        width: 20,
                        height: 50,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    MarcarVoto2(3);
                  }}
                  style={{
                    alignSelf: "center",
                    //alignItems: 'center',
                    borderRadius: 20,
                    justifyContent: "center",
                    backgroundColor:
                      votoChoiceBarras[3] === 1 ? "white" : "grey",
                    width: 380,
                    height: 50,
                    shadowRadius: 5,
                    shadowColor: "grey",
                    shadowOpacity: 0.8,
                    marginBottom: 5,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        marginTop: 15,
                        marginLeft: 5,
                        fontSize: 15,
                        textAlign: "left",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      Opción 4{" "}
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        marginRight: 5,
                        flex: 1,
                        fontSize: 15,
                        textAlign: "right",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      20%{" "}
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "orange",
                        width: 20,
                        height: 50,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    MarcarVoto2(4);
                  }}
                  style={{
                    alignSelf: "center",
                    //alignItems: 'center',
                    borderRadius: 20,
                    justifyContent: "center",
                    backgroundColor:
                      votoChoiceBarras[4] === 1 ? "white" : "grey",
                    width: 380,
                    height: 50,
                    shadowRadius: 5,
                    shadowColor: "grey",
                    shadowOpacity: 0.8,
                    marginBottom: 5,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        marginTop: 15,
                        marginLeft: 5,
                        fontSize: 15,
                        textAlign: "left",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      Opción 5{" "}
                    </Text>
                    <Text
                      style={{
                        marginTop: 15,
                        marginRight: 5,
                        flex: 1,
                        fontSize: 15,
                        textAlign: "right",
                        color: COLORS.primary,
                      }}
                    >
                      {" "}
                      20%{" "}
                    </Text>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "red",
                        width: 20,
                        height: 50,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {route.params.incidencia.tipo === 1 && (
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                }}
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 10,
                  alignItems: "center",
                  zIndex: 11111,
                  borderRadius: 20,
                  justifyContent: "center",
                  backgroundColor:
                    votoMarcado[0] === 1 || votoMarcado[1] === 1
                      ? COLORS.primary
                      : "grey",
                  width: 200,
                  height: 50,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 20,
                    textAlign: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  {" "}
                  Enviar mi votación{" "}
                </Text>
              </TouchableOpacity>
            )}
            {route.params.incidencia.tipo === 2 && (
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                }}
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 10,
                  alignItems: "center",
                  zIndex: 11111,
                  borderRadius: 20,
                  justifyContent: "center",
                  backgroundColor:
                    votoMarcadoBarras[0] === 1 ||
                    votoMarcadoBarras[1] === 1 ||
                    votoMarcadoBarras[2] === 1 ||
                    votoMarcadoBarras[3] === 1 ||
                    votoMarcadoBarras[4] === 1
                      ? COLORS.primary
                      : "grey",
                  width: 200,
                  height: 50,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 20,
                    textAlign: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  {" "}
                  Enviar mi votación{" "}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
        // </View>
      )}
      {camera && (
        <View style={{ flex: 1 }}>
          <Modal animationType="slide" transparent={true} visible={true}>
            <TouchableOpacity
              onPress={() => {
                showCamera(false);
              }}
              style={styles.buttonExit}
            >
              <Text style={styles.textExit}>X</Text>
            </TouchableOpacity>
            <View style={[styles.modalBackground]}>
              {/* <Camera
                                ref={cameraRef}
                                style={styles.camera}
                                type={cameraType}
                                onCameraReady={onCameraReady}
                            >                                
                            </Camera> */}

              <View style={styles.containerCamera}>
                <Camera
                  ref={cameraRef}
                  style={styles.camera}
                  type={cameraType}
                  onCameraReady={onCameraReady}
                ></Camera>
                {!isPreview && (
                  <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity
                      disabled={!isCameraReady}
                      onPress={switchCamera}
                    >
                      <MaterialIcons
                        name="flip-camera-ios"
                        size={28}
                        color="white"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      disabled={!isCameraReady}
                      onPress={onSnap}
                      style={styles.capture}
                    />
                  </View>
                )}
                {isPreview && (
                  <TouchableOpacity
                    onPress={cancelPreview}
                    style={styles.closeButton}
                    activeOpacity={0.7}
                  >
                    <AntDesign name="close" size={32} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  inputuser: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 30,
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
    marginTop: 35,
  },
  bottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#5A45FF",
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30,
  },
  containerCamera: {
    flex: 1,
    borderWidth: "blue",
    borderWidth: 3,
    backgroundColor: COLORS.primary,
    width: "100%",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: "100%",
    width: "100%",
  },
  buttonExit: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    color: "white",
  },
  textExit: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  containerSVGheart: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    left: 260,
    marginTop: 10,
    zIndex: 1111111,
    width: 22,
    height: 18,
    borderStyle: "solid",
    borderColor: COLORS.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: (windowHeight * 31.65) / 100,
    width: (windowWidth * 95.7) / 100,
    //borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});
