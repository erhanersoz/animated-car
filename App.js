import React from "react";
import {StatusBar, SafeAreaView, View } from "react-native";

import MainScreen from './src/views/mainScreen';

const App = () => {
  return (
    <View as={SafeAreaView} style={{flex:1}}>
      <StatusBar hidden={true} />
      <MainScreen />
    </View>
  );
};

export default App;
