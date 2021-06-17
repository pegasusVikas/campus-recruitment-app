import React, { useState } from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,

} from 'react-native';
import { useDispatch } from 'react-redux';

import {registerCompany} from '../store/action/auth'

const validateEmail=email=>{
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validatePhone=phone=>{
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return re.test(phone)
}

const App = () => {
  //const isDarkMode = useColorScheme() === 'dark';
  const [form, setForm] = useState(
      {
          companyName:"",
          email:"",
          companyPhone:"",
          password:"",
      }
  );
  const [error,setError] = useState("")
  const dispatch =useDispatch()

  const onChange = (label,text) => {
      console.log(form)
      let state={...form}
      state[label]=text
      setForm(state)
  }

  const onSubmit=()=>{
      //submit
      for(let key in form)
        if(
          (key=="email"&&!validateEmail(form[key]))||
          (key=="phone"&&!validatePhone(form[key]))||
          !form[key]
        ){
          setError(key)
          return
        }
        dispatch(registerCompany(form));
      
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/logo(2).png")}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 30, fontFamily: "comic_sans" }}>campus</Text>
          <Text style={{ fontSize: 30, fontFamily: "comic_sans" }}>recruit</Text>
        </View>
      </View>

      <KeyboardAvoidingView style={styles.body}>
        <View style={styles.loginCard}>
          <Text style={{ fontSize:20, margin: 10 }}>Company Register</Text>
          <TextInput style={styles.inputContainer}
            label="Name"
            error={error=="companyName"}
            selectionColor="red"
            underlineColor="pink"
            onChangeText={(text) => {onChange("companyName",text)}}
          />
          <HelperText type="error" visible={error=="companyName"}>Name can't be empty</HelperText>
          <TextInput style={styles.inputContainer}
            label="Email"
            error={error=="email"}
            selectionColor="red"
            underlineColor="pink"
            onChangeText={(text) => {onChange("email",text)}}
          />
          <HelperText type="error" visible={error=="email"}>Enter a valid email</HelperText>
          <TextInput style={styles.inputContainer}
            label="Phone"
            error={error=="companyPhone"}
            selectionColor="red"
            underlineColor="pink"
            keyboardType="decimal-pad"
            onChangeText={(text) => {onChange("companyPhone",text)}}
          />
          <HelperText type="error" visible={error=="companyPhone"}>Enter a valid number</HelperText>
          <TextInput style={styles.inputContainer}
            label="password"
            error={error=="password"}
            selectionColor="red"
            secureTextEntry={true}
            underlineColor="pink"
            onChangeText={(text) => {onChange("password",text)}}
          />
          <HelperText type="error" visible={error=="password"}>Password cant be empty</HelperText>
          <Button mode="contained" onPress={onSubmit}>Submit</Button>

        </View>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",

  },
  logo: {
    width: 90,
    height: 90,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    //backgroundColor:"red",
    height: 100,

  },
  body: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 7,
    marginTop: "15%"
  },
  loginCard: {
    backgroundColor: "white",
    padding: 20,
    elevation: 6,
    borderRadius: 20,
    borderColor: "violet",
    borderWidth: 2,
    maxWidth: "95%",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  inputContainer: {
    width: 230,
    maxWidth: "100%",
    maxHeight: 60,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "grey"
  },

});

export default App;