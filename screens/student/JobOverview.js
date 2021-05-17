import React, { useState } from 'react';
import { TextInput, Button, Menu, HelperText,Drawer } from 'react-native-paper';

import {    
    StyleSheet,
    View,
    } from 'react-native';



const App = () => {
    //const isDarkMode = useColorScheme() === 'dark';
    

    return (
        <View style={styles.screen}>
            
            <Drawer.Section>
                <Drawer.Item label="henlo"/>
            </Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:"grey"
    }
});

export default App;