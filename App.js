/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { DefaultTheme,Provider as PaperProvider} from 'react-native-paper';
import {combineReducers,createStore} from 'redux'
import {Provider} from 'react-redux'

import ProfileReducer from './store/reducer/user'

import AppNavigator from './navigation/RootNavigation'

const reducer=combineReducers({
  profile:ProfileReducer
})

const store=createStore(reducer);

const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'violet'
  }
}

const App = () => {
 
  //const selector = useSelector(state=>state.profile._id);
 

  return (
    <Provider store={store}>
    <PaperProvider theme={theme}>
      <AppNavigator/>
    </PaperProvider>
    </Provider>
  );
};

export default App;
