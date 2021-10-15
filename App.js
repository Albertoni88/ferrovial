import { StatusBar } from 'expo-status-bar';
import React, { useState, createRef } from 'react';
import store from './src/store/store';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeSlides from './src/components/welcomeslides';
import { CreateAccount, Login, ResetPassword, Main, EditarPerfil, Feedback, AvisosLegales, Politicas, InformacionTecnica, CrearIncidencia, FilterType, PreguntasFrecuentes, IncidenciaDetalles } from './src/screens';
import MainHeader from './src/components/mainHeader';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false)
  const Stack = createStackNavigator();


  const getFonts = () => {
    
    return Font.loadAsync({
      'roboto-medium': require('./src/assets/fonts/Roboto/Roboto-Medium.ttf'),
      'roboto-bold': require('./src/assets/fonts/Roboto/Roboto-Bold.ttf'),
      'roboto-light': require('./src/assets/fonts/Roboto/Roboto-Light.ttf'),
      'roboto-regular': require('./src/assets/fonts/Roboto/Roboto-Regular.ttf'),
      'roboto-bold-italic': require('./src/assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
      'omnes-bold': require('./src/assets/fonts/Omnes/Omnes-Bold-Regular.ttf'),
      'nunito-extra-bold': require('./src/assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
      'nunito-bold': require('./src/assets/fonts/Nunito/Nunito-Bold.ttf'),
      'nunito-semibold': require('./src/assets/fonts/Nunito/Nunito-SemiBold.ttf'),
      'nunito-regular': require('./src/assets/fonts/Nunito/Nunito-Regular.ttf'),
      'montserrat-bold': require('./src/assets/fonts/Montserrat/Montserrat-Bold.ttf'),
      'montserrat-medium': require('./src/assets/fonts/Montserrat/Montserrat-Medium.ttf'),
      'varelaround': require('./src/assets/fonts/VarelaRound/VarelaRound-Regular.ttf'),
      'poppins-medium': require('./src/assets/fonts/Poppins/Poppins-Medium.ttf'),
    })
  }
  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={WelcomeSlides}
              screenOptions={{
                headerShown: false
              }}
            >

              <Stack.Screen name='WelcomeSlides' component={WelcomeSlides} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='ResetPassword' component={ResetPassword} />
              <Stack.Screen name='CreateAccount' component={CreateAccount} />
              <Stack.Screen name='EditarPerfil' component={EditarPerfil} />
              <Stack.Screen name='Feedback' component={Feedback} />
              <Stack.Screen name='AvisosLegales' component={AvisosLegales} />
              <Stack.Screen name='Politicas' component={Politicas} />
              <Stack.Screen name='InformacionTecnica' component={InformacionTecnica} />
              <Stack.Screen name='CrearIncidencia' component={CrearIncidencia} />
              <Stack.Screen name='FilterType' component={FilterType} />
              <Stack.Screen name='PreguntasFrecuentes' component={PreguntasFrecuentes} />
              <Stack.Screen name='IncidenciaDetalles' component={IncidenciaDetalles} />
              <Stack.Screen name='Main' component={Main} />
              <Stack.Screen name='MainHeader' component={MainHeader} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => alert('ERROR LOADING FONT:' + err)}
      />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
