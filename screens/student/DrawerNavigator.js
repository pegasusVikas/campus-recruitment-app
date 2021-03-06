import React from 'react'
import { Text, Drawer, Divider } from 'react-native-paper'
import { View, StyleSheet, Image } from 'react-native'
import {
    DrawerItem,
    DrawerContentScrollView
} from '@react-navigation/drawer'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/action/auth'
export default ({ navigation }) => {
    const dispatch =useDispatch()
    const role =useSelector(state=>state.profile.role)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "space-between" }}>
            <View style={{ width: "100%" }}>
                <Drawer.Section style={styles.section}>
                    <View style={styles.header}>
                        <Image style={styles.logo} source={require("../../assets/logo(2).png")} />
                        <Text style={{ fontSize: 30, fontFamily: "comic_sans" }}>campus</Text>
                        <Text style={{ fontSize: 30, fontFamily: "comic_sans" }}>recruit</Text>
                    </View>
                </Drawer.Section>
                <Drawer.Section style={styles.section}>
                    {role!="admin"&&<Drawer.Item icon="account" label="Profile" onPress={() => { navigation.navigate("Home", { screen: "Profile" }) }} active={true} />}
                    <Drawer.Item icon="briefcase" label="Jobs" onPress={() => { navigation.navigate("Jobs", { type: "job" }) }} />
                    <Drawer.Item icon="laptop" label="Internships" onPress={() => { navigation.navigate("Jobs", { type: "internship" }) }} />
                    <Drawer.Item icon="book" label="Training programs" onPress={() => { navigation.navigate("Jobs", { type: "training" }) }} />
                </Drawer.Section>
            </View>
            <Drawer.Section style={styles.section}>
                <Drawer.Item icon="logout" label="Log out" onPress={()=>dispatch(logout())} />
            </Drawer.Section>
        </View>
    );
}

const styles = new StyleSheet.create({
    header: {
        width: "100%",
        padding: 10,
        paddingTop: 30,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white"
    },
    logo: {
        width: 110,
        height: 110
    },
    section: {
        width: "100%"
    }
})