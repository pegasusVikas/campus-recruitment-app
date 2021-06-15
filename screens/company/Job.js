import React from 'react';
import DocumentPicker from 'react-native-document-picker'
import { Button,Text, Card, Avatar, IconButton, Chip, Title, Paragraph, Subheading } from 'react-native-paper';
import {
    StyleSheet,
    View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { printCommonLine } from 'jest-diff/build/printDiffs';




const App = () => {
    //const isDarkMode = useColorScheme() === 'dark';
    let uri, title, subtitle, date, salary, type
    uri = "https://img-authors.flaticon.com/google.jpg"
    title = "Web Development SDE"
    subtitle = "Google"
    salary = 12.3
    type = "JOB"
    date = new Date()
    console.log(title)


    async function pick(){
        try{
    
            let res=await DocumentPicker.pick({type:[DocumentPicker.types.xls,DocumentPicker.types.xlsx]});
            console.log(res)
            return res;
        }catch(err){
            if(DocumentPicker.isCancel(err)){
                console.log("canceled")
            }else
                console.log(err)
        }
        return;
    }


    const pfp = () => {
        return (
            <Avatar.Image size={40} source={{ uri: uri }} />
        );
    }

    return (
        <ScrollView>
            <Card style={{ marginVertical: 2 }}>
                <Card.Title title={title} subtitle={subtitle} left={pfp} />
                <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IconButton size={20} color="green" icon="cash" />
                        <Text>{"₹" + salary + "/LPA"}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 10 }}>apply by</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", margin: 0, padding: 0 }}>
                            <IconButton size={15} icon="calendar-blank" />
                            <Text>{date.toDateString()}</Text>
                        </View>
                    </View>
                </Card.Content>
                <Card.Content style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                    <Chip>{type}</Chip>
                </Card.Content>
            </Card>
            <Card style={{ marginVertical: 2 }}>
                <Card.Content>
                    <Title>Description</Title>
                    <Paragraph>{"sadfsdgh\nsjsjsjsjkmskdmamfkma\nmkdsfmksmdf"}</Paragraph>
                </Card.Content>
                <Card.Content>
                    <Title>Elgibility</Title>
                    
                    <Text>{"\u2022"} BTech <Text style={{fontWeight:"bold"}}>4</Text>% or above</Text>
                    <Text>{"\u2022"} Intermediate <Text style={{fontWeight:"bold"}}>4</Text>% or above</Text>
                    <Text>{"\u2022"} School <Text style={{fontWeight:"bold"}}>4</Text>% or above</Text>
                   
                </Card.Content>
                <Card.Content>
                <Title>Slots</Title>
                <Text style={{fontSize:15}}>{"8"}</Text>
                </Card.Content>
                <Card.Content>
                    
                </Card.Content>
            </Card>
            <Card style={{ marginVertical: 5 }}>  
            <View>
                <Button mode="contained" onPress={pick} >Apply</Button>
            </View>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default App;