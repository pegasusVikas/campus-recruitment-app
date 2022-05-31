import React, { useState } from 'react';
import { Text, Avatar, Title, Subheading, Button, List ,IconButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker'
import Clipboard from '@react-native-community/clipboard'
import { useDispatch, useSelector } from 'react-redux';
import {
    Platform,
    ToastAndroid,
    AlertIOS,
    ScrollView,
    StyleSheet,
    View,
    Linking,
} from 'react-native';

import AppBar from "../components/AppBar"
import { uploadProfilePicture, uploadResume } from '../../store/action/student';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';

const App = ({ navigation }) => {
    const [expanded, setExpanded] = React.useState(true);
    const dispatch = useDispatch()
    const {_id, phoneNo,firstName,lastName,Class, rollNo, schoolPercentage, interPercentage, btechPercentage,role } = useSelector(state => state.profile)
    const loading = useSelector(state=>state.loading)
    console.log(_id)
    const handlePress = () => setExpanded(!expanded);

    const copy = (text) => {

        Clipboard.setString(text)
        let msg = "copied to clipboard!"
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            AlertIOS.alert(msg);
        }
    }

    const open = () => {
        Linking.openURL(`${config.url}/api/file/resume/${_id}`)
    }

    async function pickResume() {
        try {

            let res = await DocumentPicker.pick({ type: [DocumentPicker.types.pdf] });
            console.log(res)
            if (!res) return;
            const data = new FormData();
            data.append('name', 'prof')
            data.append('profile', res);
            dispatch(uploadResume(data))

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("canceled")
            } else
                console.log(err)
        }
        return;
    }

    async function pickPicture() {
        try {

            let res = await DocumentPicker.pick({ type: [DocumentPicker.types.images] });
            console.log(res)
            if (!res) return;
            const data = new FormData();
            data.append('name', 'prof')
            data.append('profile', res);
            dispatch(uploadProfilePicture(data))

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("canceled")
            } else
                console.log(err)
        }
        return;
    }

    

    return (
        <View style={styles.screen}>
            <AppBar navigation={navigation} screen="main" />
            <ScrollView style={{ paddingLeft: 10 }}>
                <View style={styles.picture}>
                    <Avatar.Image size={150}
                        key={Math.random()}
                        source={{ uri:`${config.url}/api/file/profile/${_id}` +'?' + new Date() }} />
                        <IconButton icon="square-edit-outline" onPress={pickPicture}/>
                </View>
                <View style={styles.name}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{firstName+" "+lastName}</Text>
                    <Subheading>{rollNo}</Subheading>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{Class}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Button icon="phone" labelStyle={{ fontSize: 25 }} onPress={() => { Linking.openURL('tel:${' + phoneNo + '}') }} />
                    <Button icon="email" labelStyle={{ fontSize: 25 }} onPress={() => { Linking.openURL(`mailto:${rollNo}@cvr.ac.in`) }} />
                </View>
                
                {role!="admin"&&<><List.Section>
                    <List.Subheader>contacts</List.Subheader>
                    <List.Item title={`${phoneNo}`} description="mobile"
                        onPress={() => { }}//onPress prop makes it touchable
                        onLongPress={() => { copy(`${phoneNo}`) }}
                        left={() =>
                            <Button icon="phone" color="black" />
                        } />
                    <List.Item title={`${rollNo}@cvr.ac.in`} description="email"
                        onLongPress={() => { copy(`${rollNo}@cvr.ac.in`) }}
                        onPress={() => { }} //onPress prop makes it touchable
                        left={() =>
                            <Button icon="mail" color="black" />
                        }
                    />

                </List.Section>
                <List.Section title="academics">
                    <List.Accordion
                        title="Scores"
                        expanded={expanded}
                        onPress={handlePress}
                    >
                        <List.Item title={`${schoolPercentage}%`} description="School" />
                        <List.Item title={`${interPercentage}%`} description="Inter" />
                        <List.Item title={`${btechPercentage}%`} description="BTech" />
                    </List.Accordion>
                </List.Section>
                <List.Section>
                    <View style={{ alignItems: "center" }}>
                        <Button icon="file-document" mode="contained" onPress={open}>Resume</Button>
                        <Button icon="cloud-upload" onPress={pickResume} />
                    </View>

                </List.Section></>}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    picture: {
        padding: 20,
        alignItems: "center",
    },
    body: {
        alignItems: "center"
    },
    name: {
        padding: 4,
        alignItems: "center",
    }
});

export default App;