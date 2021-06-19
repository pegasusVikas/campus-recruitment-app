import React, { useState } from 'react';
import { Appbar, Button, IconButton, Caption, Headline, Text, TextInput, Subheading, HelperText, RadioButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider'
import { ScrollView } from 'react-native-gesture-handler';
import { DatePickerModal } from 'react-native-paper-dates'
import AppBar from "../components/AppBar"
import { postJob } from '../../store/action/job';

export default (props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(false);
  const [error, setError] = useState({});
  const initial={
    title: "",
    salary: "",
    slots: "",
    description: "",
    deadline: false,
    type:"job",
    btechPercentage: 0,
    interPercentage: 0,
    schoolPercentage: 0
  }
  const [form, setForm] = useState(initial)

  const dispatch = useDispatch();

  const onDismiss = (props) => {
    setOpen(false);
  }

  const onConfirm = (props) => {
    setOpen(false);
    props.date && setForm({ ...form, deadline: props.date });
    console.log("hey", props)
  }

  const updateForm = (props) => {
    console.log(props)
    setForm({ ...form, ...props })
  }

  const onSubmit = () => {
    if (!(validSalary() || validSlots())) {
      for (let val in form)
        if (!form[val] && form[val] !== 0) {
          let err = {}
          err[val] = true
          setError(() => err)
          console.log(error)
          return
        }
      console.log("submitted");
      dispatch(postJob(form));
      setForm(initial);
    }
    
  }

  const validSalary = () => {
    const exp = /^([0-9]+(.[0-9]+)?(-[0-9]+(.[0-9]+)?)?)?$/i
    return !form.salary.match(exp)
  }
  const validSlots = () => {
    const exp = /^([0-9]+(-[0-9]+)?)?$/i
    return !form.slots.match(exp)
  }
  console.log({}.width)
  return (
    <>
      <AppBar {...props} />
      <ScrollView contentContainerStyle={styles.screen}>
        <Headline style={{ marginTop: 20 }}>Post an Offer</Headline>
        <Caption>Add a Job, Internship or Training program</Caption>
        <View style={styles.form}>
          <TextInput label="Title"
            error={error.title}
            value={form.title}
            mode="outlined"
            style={styles.inputContainer}
            onChangeText={(text) => { updateForm({ title: text }) }} />
          <View style={styles.date}>
            <View>
              <TextInput label="Salary"
                error={error.salary}
                value={form.salary}
                keyboardType="number-pad"
                mode="flat"
                onChangeText={(text) => updateForm({ salary: text })}
                style={{ ...styles.inputContainer, width: 120 }} right={<TextInput.Affix text="LPA" />} />
              <HelperText type="error" visible={validSalary()}>invalid salary range</HelperText>
            </View>
            <View>
              <TextInput label="Slots"
                error={error.slots}
                value={form.slots}
                keyboardType="number-pad"
                mode="flat"
                onChangeText={(text) => updateForm({ slots: text })}
                style={{ ...styles.inputContainer, width: 100 }} />
              <HelperText type="error" visible={validSlots()}>invalid slots</HelperText>
            </View>
          </View>
          <TextInput label="Description"
            error={error.description}
            value={form.description}
            multiline={true}
            numberOfLines={10}
            mode="flat"
            onChangeText={(text) => updateForm({ description: text })}
            style={{ ...styles.inputContainer, maxHeight: 150 }} />

          <DatePickerModal
            mode="single"
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            date={date}
            visible={open}
          />
          <View style={styles.date}>
            <Caption style={{ fontSize: 15, color: error.deadline ? "red" : "grey" }}>{form.deadline ? form.deadline.toDateString() : "Pick a Deadline"}</Caption>
            <IconButton icon="calendar-edit" color="violet" onPress={() => setOpen(true)} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="job"
              status={form.type === 'job' ? 'checked' : 'unchecked'}
              onPress={() => updateForm({type:"job"})}
            />
            <Text>Job</Text>
            <RadioButton
              value="internship"
              status={form.type === 'internship' ? 'checked' : 'unchecked'}
              onPress={() => updateForm({type:"internship"})}
            />
            <Text>Internship</Text>
            <RadioButton
              value="training"
              status={form.type === 'training' ? 'checked' : 'unchecked'}
              onPress={() => updateForm({type:"training"})}
            />
            <Text>Training</Text>
          </View>
          <View>
            <Subheading>Cut off</Subheading>
            <View style={{ alignItems: "center" }}>
              <Caption style={styles.sliderContainer}>BTech:{form.btechPercentage}%</Caption>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                thumbTintColor="purple"
                minimumTrackTintColor="violet"
                maximumTrackTintColor="grey"
                onValueChange={(props) => updateForm({ btechPercentage: Math.round(props) })}
              />
              <Caption style={styles.sliderContainer}>Intermediate :{form.interPercentage}%</Caption>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                thumbTintColor="purple"
                minimumTrackTintColor="violet"
                maximumTrackTintColor="grey"
                onValueChange={(props) => updateForm({ interPercentage: Math.round(props) })}
              />
              <Caption style={styles.sliderContainer}>school :{form.schoolPercentage}%</Caption>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                thumbTintColor="purple"
                minimumTrackTintColor="violet"
                maximumTrackTintColor="grey"
                onValueChange={(props) => updateForm({ schoolPercentage: Math.round(props) })}
              />
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 20, marginBottom: 30 }}>
          <Button icon="check" mode="contained" onPress={onSubmit}>submit</Button>
          <HelperText type="error" visible={Object.entries(error).length !== 0}>Fields must not be empty</HelperText>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: "white",

  },
  form: {
    alignItems: "center",
    elevation: 10,
    backgroundColor: "white",
    padding: 20,
    marginVertical: 10,
    borderRadius: 20
  },
  inputContainer: {
    width: 230,
    maxWidth: "100%",
    maxHeight: 60,
    margin: 10
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  sliderContainer: {
    fontSize: 14,
    marginTop: 12
  },
  slider: {
    width: 200
  },

});