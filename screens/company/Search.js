import React,{useState} from 'react';
import { Button, Card, Avatar, Text, Chip, Searchbar, List, Checkbox, Drawer,IconButton } from 'react-native-paper';
import {
  StyleSheet,
  View,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';



const App = ({ navigator, params }) => {

  //let jobs=params.jobs
  const [expand,setExpand] =useState(false);
  const [checked, setChecked] = useState([false,false,false]);
  const [skill,setSkill]=useState("")
  const [filterSkill,setFilterSkill]=useState(["ho","dd","dd"]);
  let skils=["react","react-native","angular","flutter","dart","nodejs","Vue","Reacttion","Reacttion"]


  let jobs = [
    {
      _id: 2435456,
      name: "lol"
    },
    {
      _id: 243556,
      name: "qwerty"
    },
    {
      _id: 24353456,
      name: "asd"
    },
    {
      _id: 243542356,
      name: "watch em run"
    },
    {
      _id: 243545643,
      name: "eheheh"
    },
    {
      _id: 243545236,
      name: "noiece job"
    },
  ]
  const JobCard = ({ name, _id }) => {
    return (
      <Card style={{ marginVertical: 1,zIndex:-1 }}>
        <Card.Title title={`${name}`} subtitle={`${_id}`}
          left={() => <Avatar.Image size={45} source={{ uri: "https://blog.hubspot.com/hubfs/image8-2.jpg" }} />}
          right={() => <Button>View</Button>}
        />
      </Card>
    );
  }

  const SkillFilter=()=>{
    return (
      <ScrollView 
      horizontal={true}
      style={styles.skillFilter}>
        
      </ScrollView>
    );
  }
  const Filter=()=>{
    return(
      <>
          <View style={{ flexDirection: "row" ,justifyContent:"space-evenly"}}>
            <CheckBox name="name" index={0}/>
            <CheckBox name="roll no" index={1}/>
            <CheckBox name="phone" index={2}/>
          </View>
          <View style={styles.skillSearch}>
            <Text style={{fontSize:13,fontStyle:"normal"}}>SKILL</Text>
            <Searchbar placeholder="Search Skill" onChangeText={(text)=>{setSkill(text)}}/>
            <View>
            <Drawer.Section style={{backgroundColor:"white",position:"absolute",zIndex:10,elevation:7}}>
            <Suggestion/>
            </Drawer.Section>
            </View>
          </View>
        </>
    );
  }
  const Suggestion=()=>{
    let list=[...filterSkill]
    list=list.map((text)=><Drawer.Item label={text}/>)
    console.log(list)
    return (
      <>
      {list}
      </>
    );
  }
  const CheckBox = ({name,index}) => {
    return(
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Checkbox
        color="purple"
        status={checked[index] ? 'checked' : 'unchecked'}
        onPress={() => {
          let arr=checked;
          arr[index]=!arr[index]
          setChecked([...arr]);
        }}
      />
      <Text>{name}</Text>
    </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.search}>
        <Searchbar placeholder="Search" onSubmitEditing={()=>console.log("lso")} style={styles.searchbar} />
        <IconButton color="purple" icon="filter" onPress={()=>{setExpand(!expand)}}/>
      </View>
      {expand&&<Filter/>}
      <FlatList
        ListHeaderComponent={SkillFilter}
        data={jobs}
        renderItem={({ item }) => <JobCard {...item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  search: {
    margin: 15,
    flexDirection:"row",
    backgroundColor:"white",
    elevation:10,
    borderRadius:4
  },
  searchbar:{
    flex:1,
    elevation:0
  },
  skillSearch:{
    paddingHorizontal:50,
    marginVertical:5
  },
  skillFilter:{
    marginBottom:10
  }
});

export default App;