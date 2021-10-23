import { Dimensions } from "react-native";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("window");
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const statusBarHeitgh = Constants.statusBarHeight;

export const COLORS = {
  // base colors
  primary: "rgb(80, 23, 49)", // grape purple
  browngrey: "rgb(133, 133, 133)", // orange
  GREYISH_BROWN: "rgb(62, 62, 62)",
  VERY_LIGHT_PINK: "rgb(235,235,235)",
  PALE_GREY: "rgb(237, 239, 252)",
  secondary: "#CDCDD2", // gray
  appBackGroundColor: "#F5F5F5",
  headerBAckgroundColor: "#71C5E8",
  welcomeColor: "rgb(29,29,27)",
  btnSuccess: "rgb(101, 181, 40)",
  titleComponent: "#1d1d1b",
  textRed: "#ec2a00",
  oldPrice: "#aaaaaa",
};

//SIZES
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  //TODO:Define here the other fonts according to the Design.
  // font sizes
  tabTitle: 13,
  welcomeText: 32,
  btnSuccess: 21.333333333333332,
  titleComponent: wp("5.8%"), //21.333333333333332 this is by design converted pl in px,
  bestProdPrice: wp("5.1%"), //20,

  // app dimensions
  width,
  height,
};

//TODO: Same up.

export const FONTS = {
  textTabBar: { fontFamily: "roboto-medium", fontSize: SIZES.tabTitle },
  fontWelcomeText: {
    fontFamily: "roboto-light",
    fontSize: SIZES.welcomeText,
  },
  btnText: { fontFamily: "roboto-bold", fontSize: SIZES.btnSuccess },
  textJeMeConnecte: { fontFamily: "roboto-bold" },
  bienvenue: { fontFamily: "roboto-light" },
  application: { fontFamily: "roboto-regular" },
  titleComponent: {
    fontFamily: "roboto-bold",
    fontSize: SIZES.titleComponent,
    color: COLORS.titleComponent,
    fontWeight: "bold",
    letterSpacing: 0,
    fontStyle: "normal",
    textTransform: "uppercase",
  },
  oldPrice: {
    fontFamily: "roboto-regular",
    fontSize: SIZES.bestProdPrice,
    fontWeight: "normal",
    color: COLORS.oldPrice,
  },
  currentPrice: {
    fontFamily: "roboto-regular",
    fontSize: SIZES.bestProdPrice,
    fontWeight: "bold",
    color: COLORS.textRed,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
