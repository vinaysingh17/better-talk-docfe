/**
 * @format
 */
 import * as React from 'react';
 import 'react-native-gesture-handler';
 import {AppRegistry} from 'react-native';
 import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
 import App from './App';
 import {name as appName} from './app.json';
 
 const theme = {
     ...DefaultTheme,
     colors: {
       ...DefaultTheme.colors,
       primary: '#323F4D',
     },
   };
 
 export default function Main() {
     return (<PaperProvider  theme={theme}>
         <App />
     </PaperProvider>);
 }
 
 AppRegistry.registerComponent(appName, () => Main);
 