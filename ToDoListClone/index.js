/**
 * @format
 */

import {AppRegistry} from 'react-native';
import IndexFile from './src/weatherApp/index'
import {name as appName} from './app.json';
import Home from './src/weatherApp/Screens/Home'
import Index from './src/weatherApp/index'
import AddLocal from './src/weatherApp/Screens/Home/AddLocal'
// import App from './src/weatherApp/Screens/App'
import App from './App'


AppRegistry.registerComponent(appName, () => Index);
