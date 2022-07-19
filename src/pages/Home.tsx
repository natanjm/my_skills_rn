import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native'
import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData{
  id: String,
  name: String
}

export function Home(){
  const [newSkill, setNewSkill] = useState('')
  const [mySlills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill(){
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    setMySkills([...mySlills, data])
  }

  function handleRemoveSkill(id: String){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const curentHour = new Date().getHours();
    if(curentHour < 12){
      setGreeting('Good morning');
    } else if(curentHour >= 12 && curentHour < 18){
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good night');
    }
  }, [])

  return( 
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, Nelson
      </Text>
      <Text style={styles.greetings}>
        {greeting}
      </Text>

      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      ></TextInput>

      <Button 
        title="Add"
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, {marginVertical: 50}]}>
        My Skills
      </Text>

      <FlatList
        data={mySlills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard 
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight:'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: 'white'
  }
});