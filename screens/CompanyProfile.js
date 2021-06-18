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
import { setCompany } from '../store/action/company';
import config from '../config';

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

    const   {_id,companyName, companyEmail,companyPhone,jobId} =useSelector(state=>state.company.companyProfile)
    const [expanded, setExpanded] = React.useState(true);

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(setCompany(params.job))
    },[])
    
    const onPressJobs=()=>{
        navigation.push("jobOverview",{jobs:jobId})
    }
    return (
        <View style={styles.screen}>
            <ScrollView style={{ paddingLeft: 10 }}>
                <View style={styles.picture}>
                    <Avatar.Image size={150}
                        source={{ uri: `${config.url}/api/file/profile/${_id}` }} />
                </View>
                <View style={styles.name}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{companyName}</Text>
                </View>
                
                <List.Section>
                    <List.Subheader>contacts</List.Subheader>
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