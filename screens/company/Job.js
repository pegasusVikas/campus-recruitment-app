import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPicker from 'react-native-document-picker'
import { Button, Text, Card, Avatar, IconButton, Chip, Title, Paragraph, List, ActivityIndicator } from 'react-native-paper';
import {
    StyleSheet,
    View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchJob } from '../../store/action/job';
import config from '../../config';




const App = ({ navigation, route }) => {
    //const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading)
    const profile = useSelector(state => state.job.jobProfile)
    const { title, description, deadline, salary, type, schoolPercentage, interPercentage, btechPercentage, slots,applicants } = profile
    const { _id, companyName } = profile._companyId
    const uri = config.url + "/api/file/profile/" + _id
    useEffect(() => {
        dispatch(fetchJob(route.params._id))
    }, [])

    async function pick() {
        try {

            let res = await DocumentPicker.pick({ type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx] });
            console.log(res)
            return res;
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("canceled")
            } else
                console.log(err)
        }
        return;
    }

    const onPressApplicants=()=>{
        navigation.push("search",{screen:"details",students:applicants,_companyId:_id,_jobId:profile._id})
    }

    console.log(useSelector(state => state.job.jobProfile))
    const pfp = () => {
        return (
            <Avatar.Image size={40} source={{ uri: uri }} />
        );
    }

    return (
        <ScrollView>
            {
                loading ?
                    <ActivityIndicator style={{ margin: "10%" }} color="purple" size="large" animating={true} />
                    :
                    <>
                        <Card style={{ marginVertical: 2 }}>
                            <Card.Title title={title} subtitle={companyName} left={pfp} />
                            <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <IconButton size={20} color="green" icon="cash" />
                                    <Text>{"₹" + salary + "/LPA"}</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontSize: 10 }}>apply by</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", margin: 0, padding: 0 }}>
                                        <IconButton size={15} icon="calendar-blank" />
                                        <Text>{new Date(deadline).toDateString()}</Text>
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
                                <Paragraph>{description}</Paragraph>
                            </Card.Content>
                            <Card.Content>
                                <Title>Elgibility</Title>

                                <Text>{"\u2022"} BTech <Text style={{ fontWeight: "bold" }}>{schoolPercentage}</Text>% or above</Text>
                                <Text>{"\u2022"} Intermediate <Text style={{ fontWeight: "bold" }}>{interPercentage}</Text>% or above</Text>
                                <Text>{"\u2022"} School <Text style={{ fontWeight: "bold" }}>{btechPercentage}</Text>% or above</Text>

                            </Card.Content>
                            <Card.Content>
                                <Title>Slots</Title>
                                <Text style={{ fontSize: 15 }}>{slots}</Text>
                            </Card.Content>
                            <Card.Content>

                            </Card.Content>
                            <List.Item
                            title={`Applicants (${applicants?.length})`}
                            onPress={onPressApplicants}
                            left={props => <List.Icon {...props} icon="account-group" />}
                            right={props => <List.Icon {...props} icon="chevron-right" />}
                        />
                        </Card>
                        
                        <Card style={{ marginVertical: 5 }}>
                            <View>
                                <Button mode="contained" onPress={pick} >Apply</Button>
                            </View>
                        </Card>
                    </>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default App;