import React, { useEffect, useState } from 'react';
import { Text, Avatar, Title, Subheading, Button, List } from 'react-native-paper';
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
import { setStudent } from '../store/action/student';
import config from '../config';

const App = ({ navigation,route:{params} }) => {
    const [expanded, setExpanded] = React.useState(true);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setStudent(params.student));
    },[])
    const {_id,phoneNo,rollNo,applied,schoolPercentage,interPercentage,btechPercentage} =useSelector(state=>state.student.studentProfile)
    
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

    const open=()=>{
        Linking.openURL(`${config.url}/api/file/resume/${_id}`)
    }

    const onPressApplicants=()=>{
        navigation.push("jobOverview",{jobs:applied})
    }
    return (
        <View style={styles.screen}>
            <ScrollView style={{ paddingLeft: 10 }}>
                <View style={styles.picture}>
                    <Avatar.Image size={150}
                        source={{ uri: `${config.url}/api/file/profile/${_id}` }} />
                </View>
                <View style={styles.name}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Vikas Gangadevi</Text>
                    <Subheading>{rollNo}</Subheading>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                    <Button icon="phone" labelStyle={{fontSize:25}} onPress={() => { Linking.openURL('tel:${' + phoneNo + '}') }} />
                    <Button icon="email" labelStyle={{fontSize:25}} onPress={() => { Linking.openURL(`mailto:${rollNo}@cvr.ac.in`) }} />
                    </View>
                <List.Section>
                    <List.Subheader>contacts</List.Subheader>
                    <List.Item title={`${phoneNo}`} description="mobile"
                        onPress={() => { }}//onPress prop makes it touchable
                        onLongPress={() => { copy(`${phoneNo}`) }}
                        left={() =>
                            <Button icon="phone" color="black"  />
                        } />
                    <List.Item title={`${rollNo}@cvr.ac.in`} description="email"
                        onLongPress={() => { copy(`${rollNo}@cvr.ac.in`) }}
                        onPress={() => { }} //onPress prop makes it touchable
                        left={() =>
                            <Button icon="mail" color="black"/>
                        }
                    />
                    
                </List.Section>
                <List.Section title="applied">
                <List.Item
                            title={`Applications (${applied?.length})`}
                            onPress={onPressApplicants}
                            left={props => <List.Icon {...props} icon="card-bulleted" />}
                            right={props => <List.Icon {...props} icon="chevron-right" />}
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
                    <View style={{alignItems:"center"}}>
                    <Button icon="file-document" mode="contained" onPress={open}>Resume</Button>
                    </View>

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