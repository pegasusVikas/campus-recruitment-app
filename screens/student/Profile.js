import React, { useState } from 'react';
import { Text, Avatar, Title, Subheading, Button, List } from 'react-native-paper';
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

import AppBar from "../components/AppBar"

const App = ({ navigation }) => {

    let phone = 6309296046
    let rollno = "18B81A0554"
    let schoolPercent=98
    let interPercent=88
    let BtechPercent=86
    const [expanded, setExpanded] = React.useState(true);

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
        Linking.openURL("http://www.africau.edu/images/default/sample.pdf")
    }
    return (
        <View style={styles.screen}>
            <AppBar navigation={navigation} screen="main" />
            <ScrollView style={{ paddingLeft: 10 }}>
                <View style={styles.picture}>
                    <Avatar.Image size={150}
                        source={{ uri: "https://www.denofgeek.com/wp-content/uploads/2021/02/Attack-On-Titan-Season-4-Episode-10-Eldian-Scouts.jpg?resize=768%2C432" }} />
                </View>
                <View style={styles.name}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Vikas Gangadevi</Text>
                    <Subheading>{rollno}</Subheading>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                    <Button icon="phone" labelStyle={{fontSize:25}} onPress={() => { Linking.openURL('tel:${' + phone + '}') }} />
                    <Button icon="email" labelStyle={{fontSize:25}} onPress={() => { Linking.openURL(`mailto:${rollno}@cvr.ac.in`) }} />
                    </View>
                <List.Section>
                    <List.Subheader>contacts</List.Subheader>
                    <List.Item title={`${phone}`} description="mobile"
                        onPress={() => { }}//onPress prop makes it touchable
                        onLongPress={() => { copy(`${phone}`) }}
                        left={() =>
                            <Button icon="phone" color="black"  />
                        } />
                    <List.Item title={`${rollno}@cvr.ac.in`} description="email"
                        onLongPress={() => { copy(`${rollno}@cvr.ac.in`) }}
                        onPress={() => { }} //onPress prop makes it touchable
                        left={() =>
                            <Button icon="mail" color="black"/>
                        }
                    />
                    
                </List.Section>
                <List.Section title="academics">
                        <List.Accordion
                        title="Scores"
                        expanded={expanded}
                        onPress={handlePress}
                        >
                        <List.Item title={`${schoolPercent}%`} description="School" />
                        <List.Item title={`${interPercent}%`} description="Inter" />
                        <List.Item title={`${BtechPercent}%`} description="BTech" />
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