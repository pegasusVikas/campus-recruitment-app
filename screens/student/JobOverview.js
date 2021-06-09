import React, { useState } from 'react';
import { TextInput, Button, Menu, HelperText, Drawer } from 'react-native-paper';
import JobCard from '../components/JobCard'
import AppBar from '../components/AppBar'
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView
} from 'react-native';



const App = ({navigation}) => {
    //const isDarkMode = useColorScheme() === 'dark';
    let jobs = [
        {
            uri: "https://img-authors.flaticon.com/google.jpg",
            title: "Web Development SDE",
            subtitle: "Google",
            salary: 12.3,
            type: "JOB",
            date: new Date()
        },
        {
            uri: "https://cdn.designrush.com/uploads/inspiration_images/4531/990__1511456189_555_McDonald's.png",
            title: "Waiter",
            subtitle: "Mc Donald",
            salary: 2.3,
            type: "Internship",
            date: new Date()
        },
        {
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABGlBMVEUAAAD////9kAEAAAP/kgBSNBUAAAYAAQDAdRrZ2dn8kQP8kwvx8fEAAAhhYWHVgBlzc3NpaWmhoaGurq7Ozs7ExMT39/daWlrg4OA1NTXn5+eUlJT/lgDt7e3qhwakXQA9PT2Dg4MbGxtycnLU1NSMjIwQEBC7u7seHh4rKytOTk5kZGScnJxnOwNFRUVKKwPOdQPFdRPyhAfefwzJfBUrFQQ8IgeVWgiyaA2sXRSiYRKkYR+caA8XDAkUDgDbfxOCUAdtRQO4ZgdvOwU3Hg8nGBRYORCmZw98ShAtDw9gNwJDKQ4eFgWJTQ1fPxdRLgdHMwnKcg5tOxNeMQ5MJgdmQQ6SXRsYAwh/SxowJBCtchDShiCRUx01FgVRkEVqAAAIz0lEQVR4nO2cC1fbRhaARxpVrvUAIdnC2LJibLCxIcTYvEqXkLIhsAlpSltC2938/7/Re2f0jHkZSEHL/XJOPHpG+s6d0Z3RKIwRBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEUCf7YF1AkSNYUkKwpIFlTQLKmgGRNAcmS8PhHFDhpuQI0w7PAkv7YF/VUEWHEZVBJWRRZV5I3wyN3BDE1FDZTQLKmgGTdnuihJ4pJrpD5wV9RLJXkASVRKD1HyTxRddOOem4vXS/x0je6pieLvb1z/GJ3d/f7G9nIsbv9DCOLzWqqdgeC7/nzq4h8pN4J7cB+7Eufhv6iW1nqNebvd5ZnIWu9okQ0l+9znucgy1Uy1BfucIZ4FAZkmdgIqcY1amAPVSuqrKqSw7+DrThfCE01/GHvx3+F18jSxnt7O3tm1mdxZK1JR7VKtRyVpj9HHFkgaxbuWx9q5tWyNmzO7VA1CyirLwWJpn2wJBbu3G6BLG2W6dweXtdAbehM38+1boWR1ROuVqKlpXxotdvdiQNK/T7L7JDbBpE1ZDqzhxpUMiOqaEZawrXqJuTrr0cGrhbLqgGyipHB+6hnJl5aEKE1EGWnYvm+X+9FGxc911tlTtlX1lZcz3VbbAZ3sKqD9GRCFiSYUA0NKceAQkYV/sxCpX0doiZT6CqOLAfllNNl0dp3oDCoJ01+RdxIDUqeaODcGfx7vhFv7yRHQzVEWWwoMnkRVaqaPh01MwgCFWTx1yHk7UEgtxRGlod325hcP5d7QGLFw+a/pqSyvHR7Ui8hsg6ErGDzzU8/neyammGE0Fk8DNGcOTw83N3QhKyRefjvt0fvjk1NymJFkCWegHMTq2V1VCzLUuLQKydupCyxWVRixYsPC+G+QZa9eWJz3ebsP2eBOcaRiDOUFZyApvfBLETRUXgu042tAw0Sr3ExGvimqFETq0VtLON6R/hYTGTVqtW5VWkQGysRX/X4sEhW6QO3dc503e4eaAeJLO0NL/GXGso6/c7GsS94FvAQmrVxIbrRbetSWeu4tilr13wUWuW0fZpLk9eusB0fB20WytJ1tvXula1D8WMw1sHKhpD1MZbFuc71U9yP2z9DNRwXYviv7V8qazHbklWkjnKagglZFbl1KSdLRhbXP4aauYmJ/Sd1jM42U1miGjJ+fhCGexd6idkHqjHuFkFW9/LI6mXXLsvkopxaEbJ6sixVxt0dVT3AgeNfMGEIzmHNKxXbLCHL0N5AkKEssPgOE/hgh9nMfqGp4f63v9UH4PI2S4TLerTgyJBCWb5cc40sTcg6hqTU1HaYkKUnsiCyYlkbKvYOw1Oosy8NrSCyylHznVDCdwiYY/lxci6a8zWxpyXXXCdrjLLONMzPX7CvZO2wSBaDviGmXsEnqJAfNCGtALiZ+0ZkBRQG4szckT6vlRUB1RBlQUcam6hIlp20WT8mso5GmOIbwa/Q1L8N1NFWIWSJ+7biriHrYoPv971s9tWQdfLWsuBXdKSlLCPEHCqWxRNZMqWHZo1vB6pRDFnMymWVnnzOdbLxVkufhneShamDkBW8AVnvRZ7FQ9lP/AR7/6ZpIKsIGbyMmzhNEA8+CCn5kJShtRaZua0snH/1tSxdRtY5qEFZ0GadiT3CfchdT7TCRBaTHeZyw+ksy+EsTKDkSLPXWXXkOOrCFLL4RDXU+Wd49mlQKvHfgllYzX83NfjzEXOwQyGrEJHFWkoeXzRg9dy6NXZnWaa5Dy3+/rFhzr7FCvm7hrJs/TwMzM/YKboAj4WRxWb8rBdLplcrWVvCy11laX/AGhv7ProN/Zu3GFnQ34Fs1Lax23isFkkWW8i8sqgmF+3GDuuOWM7IWp2mgTfCrhhTgHTrHIQdgawS6/4Zzx75OcAhwOLIYmzg1iCVt2peZtSTdR2vulRNXrzOO46zKosrUHSiBH8AxWT0D5NSCCJ9Q8oCIdtQyYZHUN0glv7ahBC7MP8LEXYxfoVVEDqRqApk/TP3+VB01wcrN+91BfHcGYiscPfwcFfk59oY54hgyhB+Pn//cm8cjDbPhmdGONycnTXU3ZOXv34eyxeIRZP1IGD2BLevybF18bpVDMRrgYEvVk0xwmzimLMJZaiAgRxwfo6ydDF6bCSvTzG8MgtmNCgv3lPIvQzxYgO7OwVJtO7K5P3xsXjvdS3pdjO1am4VYgz+HlwSDEPtukkOl2CIOFNHR0UY/LsPk7L0/0Fduw1GUgrN0WgUHj/Dj1Q4+/Ddrdje/vLlyxZwenp6dHR6YfPS/3lk3QMyQxAEQRAE8WB0ejfvU1jib94eiuV6Wq7e80uOx2RheW0unWjbXXRXWfJ/MHTnWd8R87Rm0gNaLTbv9Blbj4dLgZVVPMVCoqGLg6itS/+9lpI5l4tHDNYe5Eb+ASpKve4nI8OustSzLPnhAMhaUNasulJz/LqvJF8TeEuVZlNZq8KWarxuRmnh0X481FL3ys3MZtZJiuLlZDK9wsW50ZXkLe8Tp5GbRDMjpqtVm/FyC18jriu47LvxSg93chVY7iRzbSJZVhyiNQyfTjoD003earBB7l+E4xb81oPcyrenvpRdqopZRXPJrJAWeumK9/vlSryThze+qLQYaydTlSdk4Wn7mQhKZc3nJrH2PNbIXcJTRslVgZqIqfnkJkX70payklvy8JWYkLWiONG6CVlY7W4ja91nNYcVBCX3TK9EsuLLn1JWb3pZrNyoT37H8USpWtmlhoIXvqzEr8VuLWtePOLKzelldRSXFQVowjvOctLkNmuDlcW0araU1UtkYcP2layS1XScqpVEVv1qWeu5qYZwjnVWGFpVP/oqTOBZSjm9mT429V0L86BK8vAXj3sHU4m2spqcplcvL/aTIOnhIe3KZU9DnAWWaSjdzNcwhGAhl7WnH5N51cLkDY/PnNO+eSeCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCyPA3jfm/hJ4Ie80AAAAASUVORK5CYII=",
            title:"actor",
            subtitle: "Videos Online",
            salary: 100,
            type: "Full-Time",
            date: new Date()
        }
    ]

    return (
        <SafeAreaView styles={{flex:1,}}>
            <AppBar navigation={navigation}/>
            <FlatList
            data={jobs}
            renderItem={(props)=><JobCard {...props}/>}
            keyExtractor={(item)=>item.uri}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "grey"
    }
});

export default App;