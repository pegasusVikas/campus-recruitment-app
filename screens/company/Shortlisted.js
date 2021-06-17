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

const students = [
  {
    name: 'Vikas',
    rollno: 'xxxxxxxxx',
    phone: '+91xxxxxxxxx',
    email: 'xxx@xxx.xxx',
    scores: {
      school: '98%',
      jrcollege: '981/1000',
      college: '9.8/10',
    },
    image:
      'https://www.denofgeek.com/wp-content/uploads/2021/02/Attack-On-Titan-Season-4-Episode-10-Eldian-Scouts.jpg?resize=768%2C432',
  },
  {
    name: 'Vikas2',
    rollno: 'xxxxxxxxxx',
    phone: '+91xxxxxxxxx',
    email: 'xxx@xxx.xxx',
    scores: {
      school: '108%',
      jrcollege: '1081/1000',
      college: '10.8/10',
    },
  },
  {
    name: 'Vikas3',
    rollno: 'xxxxxxxxxxx',
    phone: '+91xxxxxxxxx',
    email: 'xxx@xxx.xxx',
    scores: {
      school: '99%',
      jrcollege: '991/1000',
      college: '9.9/10',
    },
  },
];

const Temp = () => {
  const {height: deviceHeight} = useWindowDimensions();
  /**
   * @type {[typeof students | undefined, React.Dispatch<typeof students | undefined>]}
   */
  const [studentsList, setStudentsList] = useState();
  useEffect(() => {
    setTimeout(() => setStudentsList(students), 3000);
  }, []);
  /**
   * @type {[typeof students[0] | undefined, React.Dispatch<typeof students[0] | undefined>]}
   */
  const [selectedStudent, setSelectedStudent] = useState();
  /**
   * @param {typeof students[0]} selectedStudent
   */
  const handleAccept = async selectedStudent => {
    setSelectedStudent(undefined);
    console.log('Accepted ', selectedStudent?.name);
  };
  /**
   * @param {typeof students[0]} rejectedStudent
   */
  const handleReject = async rejectedStudent => {
    setSelectedStudent(undefined);
    console.log('Rejected ', rejectedStudent?.name);
  };
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <Portal>
        <Dialog
          visible={!!selectedStudent}
          onDismiss={() => setSelectedStudent(undefined)}>
          <Dialog.Title>
            <Text>{selectedStudent?.name}</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text style={{textAlign: 'right'}}>{selectedStudent?.rollno}</Text>
            <View style={styles.image}>
              <Avatar.Image
                size={128}
                source={{
                  uri: selectedStudent?.image,
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
                  title={selectedStudent?.phone}
                  description="Phone"
                  onPress={() => {}}
                  onLongPress={() => {
                    copy(selectedStudent?.phone);
                  }}
                  left={() => <IconButton icon="phone" color="black" />}
                />
                <List.Item
                  title={selectedStudent?.email}
                  description="Email"
                  onLongPress={() => {
                    copy(selectedStudent?.email);
                  }}
                  onPress={() => {}} //onPress prop makes it touchable
                  left={() => <IconButton icon="mail" color="black" />}
                />

                <List.Subheader>Academics</List.Subheader>
                <List.Item
                  description="College"
                  title={selectedStudent?.scores.college}
                />
                <List.Item
                  description="Jr. College"
                  title={selectedStudent?.scores.jrcollege}
                />
                <List.Item
                  description="School"
                  title={selectedStudent?.scores.school}
                />
              </ScrollView>
            </List.Section>
            <View style={styles.resume}>
              <Button icon="file-pdf" mode="contained">
                Resume
              </Button>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => handleReject(selectedStudent)} color="red">
              Reject
            </Button>
            <Button onPress={() => handleAccept(selectedStudent)}>
              Accept
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <List.Section>
        {!studentsList && <List.Item title="Loading..." />}
        {studentsList?.map(student => (
          <List.Item
            key={student.rollno}
            title={student.name}
            left={() => <List.Icon icon="account" />}
            right={() => (
              <Button
                children="View"
                onPress={() => setSelectedStudent(student)}
              />
            )}
          />
        ))}
      </List.Section>
    </KeyboardAvoidingView>
  );
};

export default Temp;
