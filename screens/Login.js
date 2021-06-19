import React, { useState } from 'react';
import { TextInput, Button,RadioButton, HelperText } from 'react-native-paper';
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../store/action/auth'

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



const App = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verifiedEmail, setVerifiedEmail] = useState(false)
  const [type,setType] =useState("student")

  const dispatch = useDispatch()
  const loading =useSelector(state=>state.loading)
  const checkEmail = () => {
    get()
    console.log(email, password)
    setVerifiedEmail(true)
  }

  const get=()=>{
    verifiedEmail&&dispatch(login(email,password,type))
  }

  const navigateCompany=()=>navigation.navigate("CompanyRegister");
  const navigateStudent=()=>navigation.navigate("StudentRegister");
  
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
          {
            verifiedEmail &&
            <View style={{ flexDirection: "row", justifyContent: "flex-start", width: "100%" }}>
              <Button icon="backspace-outline" mode="outlined" onPress={() => setVerifiedEmail(false)} />
            </View>
          }
          <Text style={{ fontSize: 30, margin: 10 }}>Sign In</Text>
          <TextInput style={styles.inputContainer}
            value={verifiedEmail ? password : email}
            label={verifiedEmail ? "Password" : "Email"}
            secureTextEntry={verifiedEmail}
            selectionColor="red"
            underlineColor="pink"
            onChangeText={(text) => verifiedEmail ? setPassword(text) : setEmail(text)}
          />
          {!verifiedEmail&&
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="job"
              status={type === 'student' ? 'checked' : 'unchecked'}
              onPress={() => setType("student")}
            />
            <Text>Student</Text>
            <RadioButton
              value="job"
              status={type === 'admin' ? 'checked' : 'unchecked'}
              onPress={() => setType("admin")}
            />
            <Text>Admin</Text>
            <RadioButton
              value="internship"
              status={type === 'company' ? 'checked' : 'unchecked'}
              onPress={() => setType("company")}
            />
            <Text>Company</Text>
          </View>
          }
          <Button mode="contained" onPress={checkEmail}>{verifiedEmail ? "Login" : "Next"}</Button>
          <HelperText visible={loading}>Invalid email or password</HelperText>
        </View>
        {
          !verifiedEmail &&
          <View style={styles.registerCard}>
            <Text style={{ fontSize: 20, margin: 20 }}>Register</Text>
            <View style={styles.registerButton}>
              <Button 
              style={{ margin: 3 }} 
              icon="school" 
              mode="contained"
              onPress={navigateStudent}>Student</Button>
              <Button style={{ margin: 3 }} 
              icon="briefcase" 
              mode="contained"
              onPress={navigateCompany}
              >Company</Button>
            </View>
          </View>}
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
    margin: 5
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "grey"
  },
  registerCard: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  registerButton: {
    flexDirection: "row",

  }

});

export default App;