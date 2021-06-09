import React, { useState } from 'react';
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

import AppBar from "../components/AppBar"

const App = ({navigation,params}) => {

    
    
    let phone = 6309296046
    let companyName = "Google"
    let companyEmail="google@google.com"
    let companyPhone="8834783292"
    let jobs=["ssss","sssss"]
    let internships=["ssss"]
    let trainingPrograms=["ssss","sssss","s","s","s"]
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

    return (
        <View style={styles.screen}>
            <AppBar navigation={navigation} screen="main" />
            <ScrollView style={{ paddingLeft: 10 }}>
                <View style={styles.picture}>
                    <Avatar.Image size={150}
                        source={{ uri: "https://www.denofgeek.com/wp-content/uploads/2021/02/Attack-On-Titan-Season-4-Episode-10-Eldian-Scouts.jpg?resize=768%2C432" }} />
                </View>
                <View style={styles.name}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{companyName}</Text>
                </View>
                
                <List.Section>
                    <List.Subheader>contacts</List.Subheader>
                    <List.Item title={`${phone}`} description="mobile"
                        onPress={() => { }}//onPress prop makes it touchable
                        onLongPress={() => { copy(`${phone}`) }}
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
                        <List.Item title={`Jobs (${jobs.length})`}
                         titleStyle={{fontWeight:"700"}}
                         right={()=><IconButton icon="chevron-right"/>} />
                         <List.Item title={`Internships (${internships.length})`}
                         titleStyle={{fontWeight:"700"}}
                         right={()=><IconButton icon="chevron-right"/>} />
                         <List.Item title={`Trainings (${trainingPrograms.length})`}
                         titleStyle={{fontWeight:"700"}}
                         right={()=><IconButton icon="chevron-right"/>} />
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