// @ts-check

import Clipboard from '@react-native-community/clipboard';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
  ToastAndroid,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  Button,
  List,
  Dialog,
  Portal,
  Text,
  Avatar,
  IconButton,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import config from '../../config';
import { removeStudentApplication } from '../../store/action/student';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    maxHeight: 260,
  },
  resume: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  image: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
});

const copy = text => {
  Clipboard.setString(text);
  let msg = 'Copied!';
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};

const StudentPortal = ({navigation,visible,student,setVisible,_jobId}) => {

  const dispatch =useDispatch();

  const viewProfile=() => {
    navigation.push("studentProfile",{screen:student?.firstName,student})
    setVisible(false)
  }

  const rejectStudent=()=>{
    dispatch(removeStudentApplication(_jobId,student._id))
    setVisible(false)
  }
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}>
          <Dialog.Title>
            <Text>{student?.firstName}</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{textAlign: 'right'}}>{student?.rollNo}</Text>
            <View style={styles.image}>
              <Avatar.Image
                size={128}
                source={{
                  uri: config.url+"/api/file/profile/"+student?._id
                }}
              />
            </View>
            <List.Section style={styles.main}>
              <ScrollView
                style={{
                  maxHeight: 180,
                  overflow: 'scroll',
                }}>
                <List.Subheader>Contact</List.Subheader>
                <List.Item
                  title={student?.phoneNo}
                  description="Phone"
                  onPress={() => {}}
                  onLongPress={() => {
                    copy(student?.phoneNo);
                  }}
                  left={() => <IconButton icon="phone" color="black" />}
                />
                <List.Item
                  title={student?.email}
                  description="Email"
                  onLongPress={() => {
                    copy(student?.email);
                  }}
                  onPress={() => {}} //onPress prop makes it touchable
                  left={() => <IconButton icon="mail" color="black" />}
                />

                <List.Subheader>Academics</List.Subheader>
                <List.Item
                  description="College"
                  title={student?.btechPercentage}
                />
                <List.Item
                  description="Jr. College"
                  title={student?.interPercentage}
                />
                <List.Item
                  description="School"
                  title={student?.schoolPercentage}
                />
              </ScrollView>
            </List.Section>
            <View style={styles.resume}>
              <Button icon="file-pdf" mode="contained">
                Resume
              </Button>
            </View>
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent:"space-between"}}>
            <Button onPress={rejectStudent} color="red">
              Reject Student
            </Button>
            <Button onPress={viewProfile}>
              Profile
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
};

export default StudentPortal;
