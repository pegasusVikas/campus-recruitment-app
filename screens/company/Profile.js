import React, { useEffect, useState } from 'react';
import { Text, Avatar, Title, Subheading, Button, List, IconButton } from 'react-native-paper';
import Clipboard from '@react-native-community/clipboard'
import {
    Platform,
    ToastAndroid,
    AlertIOS,
    ScrollView,
    StyleSheet,
    View,
    Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '../components/AppBar'
import config from '../../config';
import DocumentPicker from 'react-native-document-picker';
import { uploadProfilePicture } from '../../store/action/student';


const copy = (text) => {

    Clipboard.setString(text)
    let msg = "copied to clipboard!"
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
        AlertIOS.alert(msg);
    }
}

const App = ({navigation,route:{params}}) => {

    const   {_id,companyName, companyEmail,companyPhone,jobId} =useSelector(state=>state.profile)
    const dispatch =useDispatch();
    useEffect(()=>{
    
    },[])


    const onPressJobs=()=>{
        navigation.push("common",{screen:"jobOverview",params:{jobs:jobId}})
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
            <AppBar navigation={navigation} screen="main"/>
            <ScrollView style={{ paddingLeft: 10 }}>
                <View style={styles.picture}>
                    <Avatar.Image size={150}
                        source={{ uri: `${config.url}/api/file/profile/${_id}` +'?' + new Date()  }} />
                        <IconButton icon="square-edit-outline" onPress={pickPicture}/>
                </View>
                <View style={styles.name}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{companyName}</Text>
                </View>
                
                <List.Section>
                    <List.Subheader>contact</List.Subheader>
                    <List.Item title={`${companyPhone}`} description="mobile"
                        onPress={() => { }}//onPress prop makes it touchable
                        onLongPress={() => { copy(`${companyPhone}`) }}
                        left={() =>
                            <Button icon="phone" color="black"  />
                        } />
                    <List.Item title={companyEmail} description="email"
                        onLongPress={() => { copy(companyEmail) }}
                        onPress={() => { }} //onPress prop makes it touchable
                        left={() =>
                            <Button icon="mail" color="black"/>
                        }
                    />
                    
                </List.Section>
                <List.Section title="hiring programs">
                        <List.Item title={`Jobs (${jobId?.length})`}
                         titleStyle={{fontWeight:"700"}}
                         right={()=><IconButton onPress={onPressJobs} icon="chevron-right"/>} />
                </List.Section>

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