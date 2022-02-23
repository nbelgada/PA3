import React from 'react';
// import {  StatusBar } from 'react-native';
// import { COLORS } from "./config/variable";

import Navigator from "./Navigator";
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {Provider} from "react-redux";
// import { store } from './redux/store';


const App = () => {

  return (
    // <Provider store={store}> 
      <SafeAreaProvider>
      {/* <StatusBar
        animated={true}
        backgroundColor={COLORS.white}
        barStyle={(global.theme == "Dark"?'light-content':"dark-content")}//['default', 'dark-content', 'light-content']
        /> */}
        <Navigator />
      </SafeAreaProvider>
    // </Provider>
  )
}

export default App