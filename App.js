/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { DefaultTheme,Provider as PaperProvider} from 'react-native-paper';
import {combineReducers,createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'

import ProfileReducer from './store/reducer/user'
import JobReducer from './store/reducer/job'
import StudentReducer from './store/reducer/student'
import CompanyReducer from './store/reducer/company'
import LoadingReducer from './store/reducer/loading'

import AppNavigator from './navigation/RootNavigation'

const reducer=combineReducers({
  
  profile:ProfileReducer,
  job:JobReducer,
  student:StudentReducer,
  company:CompanyReducer,
  loading:LoadingReducer,
})

const store=createStore(reducer,applyMiddleware(ReduxThunk));

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
