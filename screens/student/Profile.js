import React, { useState } from 'react';
import { Text, Avatar, Title, Subheading, Button, List } from 'react-native-paper';
import Clipboard from '@react-native-community/clipboard'
import { useSelector } from 'react-redux';
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

    const {phoneNo,rollNo,schoolPercentage,interPercentage,btechPercentage} =useSelector(state=>state.profile)

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