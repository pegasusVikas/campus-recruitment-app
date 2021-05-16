import React, { useState } from 'react';
import { TextInput, Button, Menu, HelperText } from 'react-native-paper';
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

const date=(text)=>{
    let str="th"
    if(text==1)str="st"
    else if(text==2)str="nd"
    else if(text==3)str="rd"
    return text+str
}
const App = () => {
    //const isDarkMode = useColorScheme() === 'dark';
    const [form, setForm] = useState(
        {
            email: "",
            password: "",
            name: ""
        }
    );
    const [branchVisible, setBranchVisible] = useState(false)
    const [year, setYear] = useState(false)
    const [section, setSection] = useState(false)

    const hasErrors=()=>{
        return form.name.indexOf("vikas")>=0
    }
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
        //submit
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

            <ScrollView>
            <KeyboardAvoidingView style={styles.body}>
                <View style={styles.loginCard}>
                    <Text style={{ fontSize: 20, margin: 10 }}>Student Register</Text>
                    <TextInput style={styles.inputContainer}
                        label="Name"
                        selectionColor="red"
                        underlineColor="pink"
                        onChangeText={(text) => { onChange("name", text) }}
                    />

                    <TextInput style={styles.inputContainer}
                        label="RollNo"
                        selectionColor="red"
                        underlineColor="pink"
                        onChangeText={(text) => { onChange("rollno", text) }}
                    />
                    <TextInput style={styles.inputContainer}
                        label="password"
                        selectionColor="red"
                        secureTextEntry={true}
                        underlineColor="pink"
                        onChangeText={(text) => { onChange("password", text) }}
                    />
                    <View style={{flexDirection:"row",marginVertical:5}}>
                        <Menu
                            visible={year}
                            onDismiss={() => setYear(false)}
                            anchor={
                                <Button style={{ borderColor: "grey", marginTop: 5,padding:0 }}
                                    mode="outlined"
                                    icon={!form.year&&"arrow-down-drop-circle-outline"}
                                    onPress={() => setYear(true)}>{form.year ? `${date(form.year)} year` : "Year"}
                                </Button>}>
                            <Menu.Item onPress={() => changeYear(1)} title="1st year" />
                            <Menu.Item onPress={() => changeYear(2)} title="2nd year" />
                            <Menu.Item onPress={() => changeYear(3)} title="3rd year" />
                            <Menu.Item onPress={() => changeYear(4)} title="4th year" />
                        </Menu>
                        <Menu
                            visible={branchVisible}
                            onDismiss={() => setBranchVisible(false)}
                            anchor={
                                <Button style={{ borderColor: "grey", marginTop: 5 }}
                                    mode="outlined"
                                    icon={!form.branch&&"arrow-down-drop-circle-outline"}
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
                                    icon={!form.section&&"arrow-down-drop-circle-outline"}
                                    onPress={() => setSection(true)}>{form.section ? form.section : ""}
                                </Button>}>
                            <Menu.Item onPress={() => changeSection("A")} title="A" />
                            <Menu.Item onPress={() => changeSection("B")} title="B" />
                            <Menu.Item onPress={() => changeSection("C")} title="C" />
                            <Menu.Item onPress={() => changeSection("D")} title="D" />
                            <Menu.Item onPress={() => changeSection("E")} title="E" />
                        </Menu>
                        
                    </View>
                    <TextInput style={styles.inputContainer}
                        label="school percentage"
                        selectionColor="red"
                        underlineColor="pink"
                        keyboardType="number-pad"
                        onChangeText={(text) => { onChange("password", text) }}
                    />
                    <TextInput style={styles.inputContainer}
                        label="inter percentage"
                        selectionColor="red"
                        underlineColor="pink"
                        keyboardType="number-pad"
                        onChangeText={(text) => { onChange("password", text) }}
                    />
                    <TextInput style={styles.inputContainer}
                        label="BTech percentage"
                        selectionColor="red"
                        underlineColor="pink"
                        keyboardType="number-pad"
                        onChangeText={(text) => { onChange("password", text) }}
                    />
                    <Button style={{marginVertical:5}} mode="contained" onPress={() => { }}>Submit</Button>

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

});

export default App;