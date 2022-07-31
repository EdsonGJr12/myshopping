import 'react-native-gesture-handler';

import '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';

import { registerRootComponent } from 'expo';

// if (__DEV__) {
//     firestore().terminate().then(() => {
//         firestore().clearPersistence().then(() => {
//             // firestore().useEmulator("localhost", 8080);
//         }).catch((error) => {
//             console.log("Clear persist error", error)
//         });
//     }).catch((error) => {
//         console.log("Terminate error", error)
//     });
// }

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
