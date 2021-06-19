import React,{useEffect, useState} from 'react';
import { Button, Card, Avatar, Text, Chip, Searchbar, List, Checkbox, Drawer,IconButton } from 'react-native-paper';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { filterStudents, getStudentsByArray } from '../store/action/student';
import StudentPortal from './components/StudentPortal';
import config from '../config';

const App = ({navigation,route:{params}}) => {

  //let jobs=params.jobs
  const [expand,setExpand] =useState(false);
  const [checked, setChecked] = useState([false,false,false]);
  const [skill,setSkill]=useState("")
  const [search,setSearch] =useState("");
  const [filterSkill,setFilterSkill]=useState(["ho","dd","dd"]);
  let skils=["react","react-native","angular","flutter","dart","nodejs","Vue","Reacttion","Reacttion"]

  const [visible,setVisible] =useState(false);
  const [selectedStudent,setSelectedStudent]=useState({});


  const students=useSelector(state=>state.student.students)
  const filteredStudents=useSelector(state=>state.student.filteredStudents)
  const {_id,role} = useSelector(state=>state.profile)
  console.log("check",_id,params._companyId)
  const dispatch=useDispatch()
  useEffect(()=>{
    console.log(params)
    console.log("params.students",params.students)
    dispatch(getStudentsByArray(params.students))
  },[params])


 

  const onStudentSearch=(text)=>{
    console.log("hmm",text)
    setSearch(text)
  }

  const onSkillSearch=(text)=>{
    setSkill(text)
  }

  const onSubmit=()=>{
    
    dispatch(filterStudents(students,search,[...checked]))
    console.log(search)
  }

  const openModal =(props)=>{
    setSelectedStudent(()=>{return {...props}})
    setVisible(true);
  }
  
  const navigateStudent=(props)=>{
    let student ={...props}
    delete student.visible
    navigation.push("studentProfile",{screen:student?.firstName,student})
  }

  const StudentCard = (props) => {
    const { firstName,lastName, _id,Class,visible }=props
    return (
      <Card style={{ marginVertical: 1,zIndex:-1 }}>
        <Card.Title title={`${firstName+" "+lastName}`} subtitle={`${Class}`}
          left={() => <Avatar.Image size={45} source={{ uri: `${config.url}/api/file/profile/${_id}` }} />}
          right={() => <Button onPress={()=>visible?openModal(props):navigateStudent(props)}>View</Button>}
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
            <CheckBox name="roll" index={1}/>
            <CheckBox name="phone" index={2}/>
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
    <>
    <KeyboardAvoidingView style={styles.screen}>
    <StudentPortal visible={visible} student={selectedStudent} setVisible={setVisible} navigation={navigation} _jobId={params._jobId}/>
      <View style={styles.search}>
        <Searchbar placeholder="Search" onSubmitEditing={onSubmit} onChangeText={onStudentSearch} style={styles.searchbar} />
        <IconButton color="purple" icon="filter" onPress={()=>{setExpand(!expand)}}/>
      </View>
      {expand&&<Filter/>}
      <FlatList
        ListHeaderComponent={SkillFilter}
        data={filteredStudents}
        renderItem={({ item }) => <StudentCard {...item} visible={!(role=="student"||(role=="company"&&params._companyId!=_id))}/>}
        keyExtractor={(item) => item._id}
      />
    </KeyboardAvoidingView>
    
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    
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