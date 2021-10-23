import React, { useState, useEffect, useRef, useMemo, createRef } from 'react';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux';
import { Button, ActivityIndicator, ImageBackground, SafeAreaView, Dimensions, ScrollView, Image, TextInput, View, Text, TouchableOpacity, Alert, Platform, StyleSheet, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuDrawer from 'react-native-side-drawer'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CarIncidencia from './Cards/cardincidencia';
import FilterBar from './FilterBar';
import Map from './Map';
import { COLORS } from '../constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Buscar from '../assets/Buscar.svg'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import SVG from './svg';
import {
    guardarIncidencias,
    guardarIncidenciasOriginals,
    loadIncidencias,
    loadSecciones
} from '../store/actions/incidenciaActions';
import {
    guardarSeccionesPerfil,
    guardarUsuario,
    initialFavoritos,
    logoutUser
} from '../store/actions/userActions';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from "react-native-svg";

export default function MainHeader({ navigation, props }) {


    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const memoIncidencias = React.useMemo(() =>
        // listOfItems.map(item => ({
        //     ...item,
        //     itemProp1: expensiveFunction(props.first),
        //     itemProp2: anotherPriceyFunction(props.second)
        // }))
        mapeoIncidencias
        , [incidencias]
    )
    const scrollRef = createRef();
    const dispatch = useReduxDispatch();
    const [open, setOpen] = useState(false);
    const [find, setFind] = useState(false);
    const [map, setMap] = useState(false);
    const [showBody, setShowBody] = useState(true);
    const [searchString, setSearchString] = useState('');
    const myRef = createRef();
    const incidencias = useReduxSelector((state) => state.incidencia.incidencias);
    const incidenciasOriginals = useReduxSelector((state) => state.incidencia.incidenciasOriginals);
    const token = useReduxSelector((state) => state.user.access_token);
    const user = useReduxSelector((state) => state.user.userInfo);
    const [end, setEnd] = useState(true);
    const [load, setLoad] = useState(true)


    useEffect(() => {

        dispatch(guardarUsuario(token));

        loadSecciones()
            .then(response => {
                dispatch(guardarSeccionesPerfil(response.data));
            })
            .catch(error => {
            });

        loadIncidencias(token)
            .then(response => {
                dispatch(guardarIncidencias(response.data.rows));
                var favoritosRe = [];
                response.data.rows.forEach(element => {
                    favoritosRe.push(element.favorito);
                });
                dispatch(initialFavoritos(favoritosRe));
                dispatch(guardarIncidenciasOriginals(response.data.rows));
                setLoad(false);
            })
            .catch(error => {
            });
    }, []);

    const handleScroll = (event) => {
        console.log(event)
    }
    const mapeoIncidencias = () => {

        return incidencias.map((incidencia, indice) => {
            return (
                <View style={{ marginTop: 8 }} key={incidencia.id}>
                    <CarIncidencia key={incidencia.id} navigation={navigation} incidencia={incidencia} />
                </View>
            );
        })

    }
    const toggleOpen = () => {
        setShowBody(!showBody);
        setOpen(!open);
        setMap(false);

    };
    const toggleFind = () => {
        setFind(!find);
    };
    const toggleMap = () => {
        setMap(!map);
    };
    const drawerContent = () => {
        return (
            // <ImageBackground
            //     source={require('../assets/fondo-login.jpg')}
            //     style={{
            //         flex: 1,

            //     }}
            // >
            <View style={{ zIndex: -111111, backgroundColor: COLORS.primary, width: windowWidth, height: windowHeight }}>
                {/* <SVG nombre={'CombinedShape'} width={windowWidth} height={windowHeight} > */}
                <Svg width={windowWidth} height={windowHeight} xmlns="http://www.w3.org/2000/svg">
                    <Path d="M84.3229762,812 L0,812 L-0.0042151456,749.294016 C22.9499017,775.029683 51.4979608,796.562493 84.3229762,812 Z M377,766.780148 L377,812 L308.581038,812 C333.915939,800.363621 357.151873,785.044844 377,766.780148 Z M182.348421,643.788042 C196.672951,705.873278 227.862865,745.348589 268.737487,781.951629 C185.773052,812.294592 111.057188,796.276159 48.4564159,733.822682 C102.4772,718.282961 147.034221,693.979132 182.348421,643.788042 Z M165.004325,703.700663 C158.596952,702.264528 152.520994,705.284095 151.894987,708.450957 L151.894987,708.450957 L139.44848,765.97002 C138.675176,769.578771 144.493366,774.47636 149.317308,775.470608 C151.190528,775.874071 152.319472,776.119657 153.412379,776.359604 L153.776318,776.439587 C155.356023,776.787083 157.024728,777.158107 160.916863,778.011463 C165.961748,779.079358 172.037706,777.495927 172.921481,773.187521 L172.921481,773.187521 L185.331164,715.557986 C185.993996,712.53842 182.348421,707.45671 175.204568,705.873278 C168.281659,704.437143 171.964058,705.210447 165.004325,703.700663 Z M192.180425,714.121851 L178.666023,777.054039 C183.232197,779.226654 199.655694,776.428032 200.428997,772.745633 L200.428997,772.745633 L209.929585,728.81462 C210.813361,724.911278 198.035438,715.41069 192.180425,714.121851 L192.180425,714.121851 Z M123.687815,710.328981 L114.297699,754.186345 C113.450747,757.868744 127.259741,767.07474 132.304627,767.07474 L145.819029,704.289847 C140.037664,703.037832 124.534767,706.425638 123.687815,710.328981 Z M275.807692,286.15351 L377,308.026957 L377,314.397506 L376.116224,313.108666 L369.524731,317.343425 L365.253149,310.751931 L356.930929,316.201881 L361.128863,322.793374 L354.53737,327.028132 L359.987319,335.424001 L366.505165,331.189243 L370.813571,337.743912 L377,333.766921 L377,344.151285 L304.088512,328.501092 L251.651159,571.723505 C239.572892,627.806433 258.389948,685.877855 299.890578,719.866392 C327.839982,710.108037 357.888352,673.983708 372.507474,606.043458 L377,585.164259 L377,609.541737 L375.158801,610.793752 L377,613.666023 L377,693.353124 C358.661656,726.789301 333.547699,748.662748 302.983792,761.514318 C236.958389,717.436009 201.091829,632.851318 215.048119,568.556643 L275.807692,286.15351 Z M294.18286,721.339352 L285.786992,726.715653 L290.095398,733.417618 L283.540729,737.578729 L288.880207,745.900949 L295.508524,741.739839 L299.81693,748.294508 L308.13915,742.881382 L303.867568,736.289889 L310.532709,732.055131 L305.082759,723.622439 L298.491266,727.930845 L294.18286,721.339352 Z M57.0732281,239.055635 L244.91237,279.488369 L184.042324,561.928325 C170.233331,626.186177 103.176856,688.676478 25.5150739,701.675344 C15.0505864,690.2646 6.45731635,677.524484 -0.00121946147,663.270839 L-0.0002151456,503.94273 L57.0732281,239.055635 Z M316.129955,646.218425 L343.232407,652.073438 C331.596028,677.739755 317.639738,693.831836 304.198984,701.343928 L304.198984,701.343928 L316.129955,646.218425 Z M264.797321,635.244877 L283.872145,639.33234 L276.912412,671.921565 C271.278342,660.69025 267.227704,648.317392 264.797321,635.244877 L264.797321,635.244877 Z M296.355475,581.702805 L328.465989,588.625714 L316.129955,646.218425 L283.872145,639.33234 L296.355475,581.702805 Z M341.022968,530.664763 L373.538546,537.624496 L361.055215,595.659095 L328.465989,588.625714 L341.022968,530.664763 Z M230.366896,560.713134 L222.007852,566.12626 L226.24261,572.791401 L219.577469,577.062983 L225.027419,585.458851 L231.618912,581.150445 L235.927318,587.778762 L244.323186,582.291989 L240.088428,575.737319 L246.679921,571.428913 L241.266795,563.106693 L234.638478,567.341451 L230.366896,560.713134 Z M277.17018,516.855769 L308.765158,523.668206 L296.355475,581.702805 L264.797321,574.964016 C265.128737,573.085993 265.533801,571.134321 265.902041,569.293122 L265.902041,569.293122 L277.17018,516.855769 Z M96.0511673,516.435209 C91.9001302,515.596675 87.876838,518.299547 86.937479,522.526663 C86.0905274,526.687773 88.7418542,530.959355 93.0134363,531.879955 C97.2850185,532.726906 101.446129,530.075579 102.366728,525.767173 C103.287328,521.532415 100.525529,517.334481 96.2907709,516.487529 Z M320.843425,467.953519 L353.027586,474.913252 L341.022968,530.664763 L308.765158,523.668206 L320.843425,467.953519 Z M124.276999,386.682986 C109.878821,368.41829 83.4392005,369.449362 73.1284851,391.948816 C47.5358163,383.810715 36.8568609,418.388436 46.4310967,435.585237 C30.6704316,447.368912 26.1042576,483.345944 52.801646,486.365511 C52.8752939,511.148052 76.5899395,522.894903 97.2850185,512.252771 C112.198732,530.222875 142.247103,528.565796 146.997397,506.545054 C174.615385,513.467963 183.158549,480.326377 175.720104,463.424169 C189.492274,451.124958 195.27364,417.394189 167.324236,412.275655 C172.037706,390.365385 145.266669,376.409095 124.276999,386.682986 Z M93.2343802,419.750924 C87.3057188,398.393013 102.145784,387.382642 115.402419,407.267593 C116.80173,409.477032 120.889192,410.28716 123.098631,408.887849 C143.462294,396.294046 152.410522,412.422951 138.159641,429.398808 C135.28737,432.786614 137.717753,434.701461 140.921439,433.633566 C164.636085,425.274521 171.33805,440.556475 160.254031,449.615175 C155.282793,452.966157 152.66829,465.265368 155.945625,469.72107 C163.789133,480.657793 149.943315,493.693483 131.715443,476.275739 C129.28506,473.992652 126.191846,474.765956 127.407037,479.000714 C133.409347,500.395448 118.532457,511.295348 105.275823,491.44722 C103.876512,489.237781 99.8626973,488.501302 97.6164343,489.790141 C77.2895952,502.383944 68.2677192,486.291863 82.5554249,469.389654 C85.3540477,466.001847 82.9973127,463.976528 79.7936261,465.118072 C56.0421565,473.403468 49.3033675,457.237739 60.4610346,449.173287 C65.1376806,446.080072 67.5312395,434.443693 64.7694407,429.030568 C58.2515956,416.731357 70.7349261,405.094978 89.0364461,422.402251 C91.430005,424.758986 94.4863957,423.985682 93.2343802,419.750924 Z M365.621389,416.399941 L377,418.830324 L377,480.031785 L353.027586,474.913252 L365.621389,416.399941 Z M108.000798,413.159431 L103.545096,433.780862 L82.6290729,429.32516 L78.2470188,449.615175 L99.1998656,454.070877 L94.6705156,474.765956 L114.629115,479.074362 L119.084817,458.379283 L139.853544,462.834985 L144.272422,442.471322 L123.430047,438.089268 L127.959397,417.504661 L108.000798,413.159431 Z M193.211496,455.58066 C188.976738,454.623236 184.815628,457.385035 183.895029,461.693441 C182.974429,465.854552 185.66258,470.015662 190.00781,470.973085 C194.132096,471.893685 198.366854,469.242358 199.25063,464.933952 C200.171229,460.66237 197.446255,456.50126 193.211496,455.58066 Z M301.805425,402.627771 L333.437227,409.477032 L320.843425,467.953519 L289.211622,461.104258 L301.805425,402.627771 Z M256.327805,432.050134 L247.858289,437.500084 L252.129871,444.128401 L245.538378,448.363159 L251.025151,456.795852 L257.542996,452.561093 L261.814578,459.078939 L270.136799,453.702637 L265.975689,447.07432 L272.530358,442.839562 L267.154056,434.480517 L260.599387,438.752099 L256.327805,432.050134 Z M33.3954064,421.150235 C29.1238243,420.26646 24.9258902,422.917786 24.0421145,427.152545 C23.084691,431.387303 25.7728418,435.658885 30.0812479,436.505836 C34.316006,437.46326 38.4771162,434.701461 39.3977158,430.466703 C40.3183154,426.305593 37.6301646,422.107659 33.3954064,421.150235 Z M345.810086,352.031617 L377,358.733582 L377,363.594348 L365.621389,416.399941 L333.437227,409.477032 L345.810086,352.031617 Z M129.911068,360.169718 C125.713134,359.322766 121.5152,361.974093 120.631424,366.245675 C119.674001,370.480433 122.398975,374.715191 126.744206,375.598967 C130.905316,376.593215 135.140074,373.831416 135.987026,369.559834 C136.944449,365.398724 134.18265,361.163965 129.911068,360.169718 Z M377,324.413629 L377,328.906156 L374.827385,325.702469 L377,324.413629 Z M286.192056,293.776075 L277.869835,299.189201 L282.104594,305.780694 L275.549924,310.0891 L280.889402,318.41132 L287.517719,314.213386 L291.715653,320.841703 L300.18517,315.318105 L295.913588,308.726612 L302.541905,304.528678 L297.091955,296.13281 L290.500462,300.404392 L286.192056,293.776075 Z M377,0 L377,90.213092 L369.929795,100.560632 L377,102.070415 L377,124.275277 C368.714604,126.374244 361.902167,132.965737 359.987319,141.877141 C357.335993,154.139528 364.921733,166.254619 377,169.311009 L377,184.740259 L109.510581,127.110724 L99.4576335,173.47212 L377,233.237445 L377,260.045306 L20.3228922,183.193651 L-0.0002151456,277.48173 L0,0 L78.9381297,0.00128557782 C83.971466,14.5327109 88.8683877,26.0249142 94.5600437,41.1635455 L149.501428,53.2418122 L128.532785,-0.000269719158 L183.151785,-0.000269719158 L193.43244,62.6687521 L242.997523,73.2372355 L229.865785,-0.000269719158 L299.582785,-0.000269719158 L281.957298,81.7067518 L330.859548,92.2384112 L350.00802,3.56625798 C350.551029,2.31079042 351.152438,1.12218082 351.806982,-0.00121355477 L377,0 Z M300.995297,105.384573 C288.438319,102.733247 276.102284,110.650403 273.377309,123.207382 C270.689159,135.727536 278.679963,148.100395 291.163294,150.825369 C303.757096,153.51352 316.166779,145.596364 318.744458,133.039385 C321.506256,120.445583 313.552276,108.072724 300.995297,105.384573 Z M211.439368,86.1256298 C198.919214,83.474303 186.546355,91.3546355 183.821381,103.911614 C181.170054,116.431769 189.160858,128.804627 201.644189,131.492778 C214.237991,134.254577 226.537202,126.263772 229.299001,113.743618 C231.950328,101.112991 223.959523,88.8137807 211.439368,86.1256298 Z M123.245927,67.382222 C110.762597,64.6572472 98.389738,72.6112277 95.7384112,85.1313823 C93.0134363,97.6883608 101.041065,110.061219 113.561219,112.74937 C126.081374,115.474345 138.417408,107.48354 141.142383,94.926562 C143.830534,82.4064075 135.802906,70.0335489 123.245927,67.382222 Z" id="Combined-Shape" fill="#58223b" />
                </Svg>
                <View style={styles.containerSide}>
                    <ScrollView>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={styles.goBack}>
                                <View style={styles.containerSVGBack}>
                                    <TouchableOpacity
                                        onPress={toggleOpen}
                                    >
                                        <SVG nombre={'VolverBlanco'} width={20} height={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                alignContent: 'center',
                                height: 64,
                                width: 228,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                marginTop: 55,
                                // position : 'relative'
                            }}>
                                {/* <View style={styles.containerSVGLogo}>
                                    <SVG nombre={'Logo'} width={200} height={50} />
                                </View> */}
                                <Image style={styles.logo} source={require('../assets/group9.png')}></Image>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('EditarPerfil')
                            }}
                            style={styles.perfil}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('EditarPerfil')
                                }}
                                style={styles.containerSVGPerfil}>
                                <SVG nombre={'Perfil'} width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.navItemStyle}>
                                Editar perfil
                            </Text>
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Feedback')
                                }}
                                style={styles.feedback}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Feedback')
                                    }}
                                    style={styles.containerSVGFeedback}>
                                    <SVG nombre={'Feedback'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Feedback
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('PreguntasFrecuentes')
                                }}
                                style={styles.navSectionStyle}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('PreguntasFrecuentes')
                                    }}
                                    style={styles.containerSVGFaq}>
                                    <SVG nombre={'Faq'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Preguntas frecuentes
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('AvisosLegales')
                                }}
                                style={styles.avisos}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('AvisosLegales')
                                    }}
                                    style={styles.containerSVGAvisos}>
                                    <SVG nombre={'Avisos'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Avisos legales
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Politicas')
                                }}
                                style={styles.politicas}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Politicas')
                                    }}
                                    style={styles.containerSVGPoliticas}>
                                    <SVG nombre={'Politicas'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Políticas de privacidad
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('InformacionTecnica')
                                }}
                                style={styles.informacion}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('InformacionTecnica')
                                    }}
                                    style={styles.containerSVGInfoTec}>
                                    <SVG nombre={'InfoTec'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Información técnica
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('WelcomeSlides')
                                }}
                                style={styles.infoproduct}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('WelcomeSlides')
                                    }}
                                    style={styles.containerSVGInfoProd}
                                >
                                    <SVG nombre={'InfoProd'} width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.navItemStyle}>
                                    Info de producto
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={styles.footerContainer}>
                        <Text style={{
                            width: 135,
                            height: 24,
                            opacity: 0.5,
                            fontFamily: 'nunito-bold',
                            fontSize: 18,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0.45,
                            textAlign: "center",
                            color: 'rgb(255, 255,255)'
                        }}
                            onPress={() => {
                                dispatch(logoutUser())
                                navigation.navigate('Login');
                            }}
                        >
                            Cerrar sesión
                        </Text>
                    </View>
                </View>
                {/* </Svg> */}
                {/* </SVG> */}
            </View>
        );
    };
    const ShowMap = () => {
        toggleMap();
    }
    const FiltrarIncidencia = (searchStringInput) => {

        if (searchStringInput === '') {
            dispatch(guardarIncidencias(incidenciasOriginals));
        } else if (searchStringInput !== null && searchStringInput !== undefined) {
            var filtrados = [];
            incidenciasOriginals.forEach(element => {
                if (element.autor_fullname.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.autor_username.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.direccion.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.tipo_incidencia.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.estado.toLowerCase().includes(searchStringInput.toLowerCase())
                    || element.titulo.toLowerCase().includes(searchStringInput.toLowerCase())) {
                    filtrados.push(element);
                }
            });
            dispatch(guardarIncidencias(filtrados));
        }
    }

    const pressOut = () => {
        myRef.current.blur();
        toggleFind();
    }


    return (

        <View
            style={{ flex: 1, height: windowHeight }}
        >
            {
                (open === false && find === false) &&
                <View style={{
                    zIndex: 111111
                }}>
                    <View style={styles.containerWebView}>
                        {/* <Icon
                            style={{
                                flex: 0.55,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                color: COLORS.primary,
                                marginLeft: 12,
                                marginTop: 31,
                                alignSelf: 'center'
                            }}
                            onPress={toggleOpen}
                            name="ios-menu"
                            size={30}
                        /> */}
                        <TouchableOpacity
                            style={{
                                width: 25,
                                height: 30,
                                marginTop: 50,
                                marginLeft: 12,
                                marginRight: 120
                            }}
                            onPress={toggleOpen}
                        >
                            <SVG nombre={'Menu'} width={20} height={20} />
                        </TouchableOpacity>

                        <Text style={{
                            //flex: 1,
                            width: 280,
                            height: 27,
                            fontFamily: "nunito-bold",
                            fontSize: 20,
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: COLORS.primary,
                            textAlign: 'left',
                            alignSelf: 'center',
                            marginLeft: -5,
                            marginTop: 40,
                            //borderWidth : 3
                        }}>
                            Valdepeñas
                        </Text>
                        {/* <View style={styles.containerSVG}>
                            <TouchableOpacity
                                onPress={toggleFind}
                            >
                                <SVG nombre={'Buscar'} width={20} height={20} />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>

            }
            {
                (open === false && find === true) &&
                <View style={styles.searchSection}>
                    <Icon style={styles.searchIcon} name="ios-search" size={20} color={COLORS.primary} />
                    <TextInput
                        value={searchString}
                        ref={myRef}
                        autoFocus={true}
                        style={styles.input}
                        placeholder="Buscar..."
                        onChangeText={(searchStringInput) => {
                            setSearchString(searchStringInput);
                            FiltrarIncidencia(searchStringInput);
                        }}
                        underlineColorAndroid="transparent"
                        onBlur={pressOut}
                    />
                    <Text
                        onPress={() => {
                            FiltrarIncidencia(searchString)
                            toggleFind();
                        }}
                        style={{
                            flex: 1,
                            fontSize: 15,
                            color: COLORS.primary,
                            padding: 10,

                        }}>
                        Aplicar
                    </Text>
                </View>

            }
            <View
                style={{
                    width: '100%',
                    zIndex: 9999,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                }}
                pointerEvents={find === true ? 'none' : 'auto'}
            >
                {/* {
                    open === false &&
                    <FilterBar navigation={navigation} showMap={ShowMap} />
                } */}
            </View>
            <MenuDrawer
                open={open}
                drawerContent={drawerContent()}
                drawerPercentage={100}
                animationTime={250}
                overlay={true}
                opacity={0.4}
            >
            </MenuDrawer>
            {(showBody && map === false) &&
                <View style={{ flex: 1 }}>
                    <ScrollView
                        ref={scrollRef}
                        // onScrollEndDrag={() => {
                        //     setEnd(true);
                        // }}
                        // onTouchStart={() => {
                        //     setEnd(true);
                        // }}
                        // onTouchEnd={() => {
                        //     setEnd(true);
                        // }}
                        // onScroll = {handleScroll} 
                        onScroll={event => {
                            console.log(event.nativeEvent.contentOffset.y)
                        }}
                        onScrollBeginDrag={() => {
                            setEnd(false);
                            console.log("being")
                        }}
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setEnd(true)
                                console.log("end")
                            }
                        }}
                        scrollEventThrottle={400}
                        style={{ flex: 1, opacity: find === false ? 1 : 0.3, }}
                        persistentScrollbar={true}
                        indicatorStyle={{ color: 'grey', }}
                    >
                        {(showBody && load === false && map === false && incidencias !== null && incidencias !== undefined) &&
                            <View style={{
                                zIndex: -1,
                                marginBottom: 125
                            }}
                            >

                                {incidencias.map((incidencia, indice) => {
                                    console.log("indice ", indice, " incidencia ", incidencia)
                                    return (
                                        <CarIncidencia indice={indice} key={incidencia.id} navigation={navigation} incidencia={incidencia} />
                                    );
                                })}
                            </View>
                        }
                        {
                            showBody && load === true &&
                            <ActivityIndicator
                                size="large"
                                color={COLORS.primary}
                                style={{ marginTop: 250, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1 }}
                            />
                        }
                    </ScrollView>
                </View>
            }
            {
                map === true &&
                <View style={{
                    height: '100%'
                }}>
                    <Map filtroMapa={FiltrarIncidencia} cantidadIncidencias={incidenciasOriginals.length} incidencias={incidencias} />
                </View>
            }
            {(showBody && map === false) &&

                <View style={{ position: 'absolute', bottom: 0, height: 100, width: '100%', zIndex: 0, backgroundColor: 'transparent' }}>
                    <LinearGradient
                        colors={['transparent', 'transparent', end === true ? 'transparent' : COLORS.PALE_GREY]}
                        start={{ x: 0, y: 0.2 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.linearGradient}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('CrearIncidencia');
                            }}
                            style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: 20,
                                alignItems: 'center',
                                zIndex: 11111,
                                width: 198,
                                height: 44,
                                borderRadius: 22,
                                backgroundColor: COLORS.primary,
                                shadowColor: "rgba(0, 0, 0, 0.1)",
                                shadowOffset: {
                                    width: 0,
                                    height: 4
                                },
                                shadowRadius: 10,
                                shadowOpacity: 1
                            }}>
                            <Text style={{
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: Platform.OS === 'ios' ? 155 : 175,
                                height: 24,
                                fontFamily: 'nunito-bold',
                                fontSize: 18,
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0.45,
                                textAlign: "center",
                                color: 'white'
                            }}> Crear incidencia </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            }
            {/* </View> */}
            {/* </LinearGradient> */}
        </View>
    );
}
const styles = StyleSheet.create({
    linearGradient: {
        //flex: 1,
        height: 100,
        // borderColor: 'red',
        // borderWidth: 3,
        zIndex: -111111,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 88,
        zIndex: 9999,
    },
    logo: {
        width: 228,
        height: 64,
    },
    searchIcon: {
        padding: 10,
        left: 40,
        zIndex: 15
    },
    searchIconValdepennas: {
        padding: 10,
        left: 0,
        zIndex: 15
    },
    input: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        textAlign: 'center',
        borderWidth: 0.2,
        borderRadius: 15,
        width: 300
    },

    container: {
        //marginTop: 20,
        flex: 1,
        // zIndex: 1111111,
        width: '100%',
        height: 88,
        backgroundColor: COLORS.PALE_GREY,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 15,
        shadowOpacity: 1,
    },
    containerSVG: {
        borderStyle: "solid",
        left: -15,
        zIndex: 1111111,
        width: 15,
        height: 15,
        borderColor: COLORS.primary,
        marginTop: 30
    },
    containerSVGBack: {
        borderStyle: "solid",
        //left: -15,
        // borderWidth : 3,
        // borderColor : 'white',
        zIndex: 1111111,
        width: 25,
        height: 25,
        borderColor: COLORS.primary,
        marginTop: 30
    },
    goBack: {
        position: 'absolute',
        // marginTop: 30,
        // marginLeft: 12,
        marginLeft: 15,
        marginTop: 51,
        width: 20,
        height: 20,
        zIndex: 111111
    },
    containerSVGLogo: {
        borderStyle: "solid",
        left: -15,
        zIndex: 1111111,
        width: 15,
        height: 15,
        borderColor: COLORS.primary,
        marginTop: 30
    },
    containerSVGVolver: {
        left: 15,
        zIndex: 1111111,
        width: 15,
        height: 15,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGPerfil: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGFeedback: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGFaq: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGAvisos: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGPoliticas: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGInfoTec: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    containerSVGInfoProd: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        zIndex: 1111111,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: COLORS.primary
    },
    inputfind: {
        width: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        backgroundColor: "grey",
        borderColor: 'white',
        borderWidth: 2
    },
    animatedBox: {
        padding: 10,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow'
    },
    containerWebView: {
        width: '100%',
        zIndex: 9999,
        alignItems: 'center',
        backgroundColor: 'white',
        height: 88,
        flexDirection: 'row',

    },
    containerInput: {
        width: '100%',
        zIndex: 9999,
        alignItems: 'center',
        backgroundColor: 'white',
        height: 88,
        flexDirection: 'row'
    },
    iconBackContainer: {
        backgroundColor: 'rgb(113, 197, 232)',
        height: 55,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    close: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 30,
        top: 5,
    },
    containerSide: {
        //flex: 1,
        position: 'absolute',
        width: '100%',
        //top: 20,
        height: '100%',
        zIndex: 99999999,
        zIndex: 11111111111111111
    },
    navItemStyle: {
        width: 305,
        height: 20,
        fontFamily: 'montserrat-medium',
        fontSize: 16,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        color: COLORS.primary,
        alignSelf: 'center',
        marginLeft: 12,
        alignSelf: 'center'
    },
    perfil: {
        marginTop: (windowHeight * 31) / 250,
        marginBottom: 25,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    politicas: {
        alignItems: 'center',
        marginBottom: 5,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    avisos: {
        alignItems: 'center',
        marginBottom: 5,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    infoproduct: {
        alignItems: 'center',
        marginBottom: 25,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    navSectionStyle: {
        alignItems: 'center',
        marginBottom: 25,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    informacion: {
        marginBottom: 25,
        alignItems: 'center',
        marginBottom: 25,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    feedback: {
        alignItems: 'center',
        marginBottom: 5,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        alignItems: 'center',
    }
});