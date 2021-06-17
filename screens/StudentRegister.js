import React, { useState } from 'react';
import { TextInput, Button, Menu, HelperText,Caption } from 'react-native-paper';
import Slider from '@react-native-community/slider'
import { useDispatch ,useSelector} from 'react-redux';
import {registerStudent} from '../store/action/auth'
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

const date = (text) => {
    let str = "th"
    if (text == 1) str = "st"
    else if (text == 2) str = "nd"
    else if (text == 3) str = "rd"
    return text + str
}
const App = () => {
    //const isDarkMode = useColorScheme() === 'dark';
    const [form, setForm] = useState(
        {
           
            name: "",
            rollno:"",
            phone:"",
            password: "",
            year:"",
            branch:"",
            section:"",
            schoolPercentage:0,
            interPercentage:0,
            btechPercentage:0,
        }
    );
    const [error,setError] = useState({
        name:false,
        rollno:false,
        phone:false,
        password:false,
        year:false,
        branch:false,
        section:false,
    });
    const [branchVisible, setBranchVisible] = useState(false)
    const [year, setYear] = useState(false)
    const [section, setSection] = useState(false);

    const dispatch = useDispatch();

    const changeBranch = (text) => {
        setBranchVisible(false)
        setForm({ ...form, branch: text })
    }
    const changeYear = (text) => {
        setYear(false)
        setForm({ ...form, year: text })
    }
    const changeSection = (text) => {
        setSection(false)
        setForm({ ...form, section: text })
    }
    const onChange = (label, text) => {
        console.log(form)
        let state = { ...form }
        state[label] = text
        setForm(state)
    }

    const onSubmit = () => {
        let obj={}
        let noError=true
        for(let key in form){
            if(typeof(form[key])==typeof(1))
            continue;
            if(key=="password"&&form[key].length<6)
            obj[key]=true;
            else if(form[key]=="")
            obj[key]=true
            else
            obj[key]=false
            if(obj[key])noError=false
        }
        setError({...error,...obj});
        //submit

        if(noError){
            console.log("dispatched")
            dispatch(registerStudent(form));
        }
    }
    //console.log(useSelector(state=>state))
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

            <ScrollView>
                <KeyboardAvoidingView style={styles.body}>
                    <View style={styles.loginCard}>
                        <Text style={{ fontSize: 20, margin: 10 }}>Student Register</Text>
                        <TextInput style={styles.inputContainer}
                            label="Name"
                            error={error.name}
                            selectionColor="red"
                            underlineColor="pink"
                            onChangeText={(text) => { onChange("name", text) }}
                        />
                        <HelperText type="error" visible={error.name}>Name must not be empty</HelperText>
                        <TextInput style={styles.inputContainer}
                            label="RollNo"
                            error={error.rollno}
                            selectionColor="red"
                            underlineColor="pink"
                            onChangeText={(text) => { onChange("rollno", text) }}
                        />
                        <HelperText type="error" visible={error.rollno}>RollNo must not be empty</HelperText>
                        <TextInput style={styles.inputContainer}
                            label="Phone"
                            error={error.phone}
                            selectionColor="red"
                            keyboardType="decimal-pad"
                            underlineColor="pink"
                            onChangeText={(text) => { onChange("phone", text) }}
                        />
                        <HelperText type="error" visible={error.phone}>Enter a valid mobile number</HelperText>
                        <TextInput style={styles.inputContainer}
                            label="password"
                            error={error.password}
                            selectionColor="red"
                            secureTextEntry={true}
                            underlineColor="pink"
                            onChangeText={(text) => { onChange("password", text) }}
                        />
                        <HelperText type="error" visible={error.password}>Password must be atleast 6 characters</HelperText>
                        <View style={{ flexDirection: "row", marginVertical: 5 }}>
                            <Menu
                                visible={year}
                                onDismiss={() => setYear(false)}
                                anchor={
                                    <Button style={{ borderColor: "grey", marginTop: 5, padding: 0 }}
                                        mode="outlined"
                                        icon={!form.year && "arrow-down-drop-circle-outline"}
                                        onPress={() => setYear(true)}>{form.year ? `${form.year}` : "Year"}
                                    </Button>}>
                                <Menu.Item onPress={() => changeYear("1st year")} title="1st year" />
                                <Menu.Item onPress={() => changeYear("2nd year")} title="2nd year" />
                                <Menu.Item onPress={() => changeYear("3rd year")} title="3rd year" />
                                <Menu.Item onPress={() => changeYear("4th year")} title="4th year" />
                            </Menu>
                            <Menu
                                visible={branchVisible}
                                onDismiss={() => setBranchVisible(false)}
                                anchor={
                                    <Button style={{ borderColor: "grey", marginTop: 5 }}
                                        mode="outlined"
                                        onPress={() => setBranchVisible(true)}>{form.branch ? form.branch : "branch"}
                                    </Button>}>
                                <Menu.Item onPress={() => changeBranch("CSE")} title="CSE" />
                                <Menu.Item onPress={() => changeBranch("ECE")} title="ECE" />
                            </Menu>
                            <Menu
                                visible={section}
                                onDismiss={() => setSection(false)}
                                anchor={
                                    <Button style={{ borderColor: "grey", marginTop: 5 }}
                                        mode="outlined"
                                        onPress={() => setSection(true)}>{form.section ? form.section : "Class"}
                                    </Button>}>
                                <Menu.Item onPress={() => changeSection("A")} title="A" />
                                <Menu.Item onPress={() => changeSection("B")} title="B" />
                                <Menu.Item onPress={() => changeSection("C")} title="C" />
                                <Menu.Item onPress={() => changeSection("D")} title="D" />
                                <Menu.Item onPress={() => changeSection("E")} title="E" />
                            </Menu>

                        </View>
                        <HelperText type="error" visible={error.branch||error.section||error.year}
                        >Select your degree details</HelperText>
                        <Caption style={styles.sliderContainer}>school :{form.schoolPercentage}%</Caption>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor="purple"
                            minimumTrackTintColor="violet"
                            maximumTrackTintColor="grey"
                            onValueChange={(props) => onChange( "schoolPercentage", Math.round(props) )}
                        />
                         <Caption style={styles.sliderContainer}>junior college :{form.interPercentage}%</Caption>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor="purple"
                            minimumTrackTintColor="violet"
                            maximumTrackTintColor="grey"
                            onValueChange={(props) => onChange("interPercentage", Math.round(props) )}
                        />
                         <Caption style={styles.sliderContainer}>B-Tech :{form.btechPercentage}%</Caption>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor="purple"
                            minimumTrackTintColor="violet"
                            maximumTrackTintColor="grey"
                            onValueChange={(props) => onChange( "btechPercentage", Math.round(props) )}
                        />
                        <Button style={{ marginVertical: 10 }} mode="contained" onPress={onSubmit}>Submit</Button>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
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
        marginTop: "5%"
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
        marginBottom: 10
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
    sliderContainer: {
        fontSize: 14,
        marginTop: 12
      },
      slider: {
        width: 200
      },

});

export default App;