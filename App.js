import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import Slider from '@react-native-community/slider'
import Clipboard from 'expo-clipboard'
 
let charsetFull = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
let charsetLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let charsetNumbers = '123456789'

export default function App() {

  const [size, setSize] = useState(5)
  const [password, setPassword] = useState('')
  const [isOnlyLetter, setIsOnlyLetter] = useState(false)
  const [isOnlyNumber, setIsOnlyNumber] = useState(false)

  function generatePassword() {    
    let pass = '';

    if (isOnlyLetter) {
      for(let i = 0, n = charsetLetters.length; i < size; i++) {
        pass += charsetLetters.charAt(Math.floor(Math.random() * n));
      }
    } else if (isOnlyNumber) {
      for(let i = 0, n = charsetNumbers.length; i < size; i++) {
        pass += charsetNumbers.charAt(Math.floor(Math.random() * n));
      }
    } else {
      for(let i = 0, n = charsetFull.length; i < size; i++) {
        pass += charsetFull.charAt(Math.floor(Math.random() * n));
      }
    }
    setPassword(pass)
  }

  const copyPass = () => {
    Clipboard.setString(password)
    alert("Senha copiada.")
  }

  const changeIsOnlyLetter = () => {
    setIsOnlyLetter(previusState => !previusState)
    setIsOnlyNumber(false)
  }
  const changeIsOnlyNumber = () => {
    setIsOnlyNumber(previusState => !previusState)
    setIsOnlyLetter(false)
  }

  return(
    <View style={styles.container}>
      <StatusBar></StatusBar>
      
      <Image
        source={require('./src/assets/logo.png')}
        style={styles.logo}
      />
      <Text style={ styles.title}>{size} Caracteres</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          maximumTrackTintColor="#ff0000"
          minimumTrackTintColor="ff00ff"
          value={size}
          onValueChange={(value) => {setSize(value.toFixed(0)) }}
        />

      </View>

      <View style={styles.options}>
          <Text style={styles.options_title}>Somente letras</Text>
          <Switch
            trackColor={{false: "#FF0000", true: "#00FF00"}}
            value={isOnlyLetter}
            onValueChange={changeIsOnlyLetter}
          />
        </View>
        <View style={styles.options}>
          <Text style={styles.options_title}>Somente números</Text>
          <Switch
            trackColor={{false: "#FF0000", true: "#00FF00"}}
            value={isOnlyNumber}
            onValueChange={changeIsOnlyNumber}
          />
        </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>Gerar Senha</Text>
      </TouchableOpacity>

      {password !== '' && (
        <View style={styles.passwordArea}>
          <Text style={{ fontSize: 20 }} onLongPress={copyPass}>{password}</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f3ff'
  },
  logo:{
    marginBottom: 50
  },
  title:{
    fontSize:26,
    fontWeight: 'bold'
  },
  area:{
    backgroundColor: "#fff",
    borderRadius: 7,
    marginTop: 15,
    marginBottom: 15,
    width: '90%',
    paddingHorizontal: 20
  },
  button:{
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#ffa200',
    borderRadius: 10,
  },
  passwordArea:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: '90%',
    marginVertical: 15,
    paddingVertical: 5,
    borderRadius: 10
  },
  options:{
    width: '90%',
    height: 50,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 35,
    marginVertical: 10
  },
  options_title:{
    fontSize: 20,
    color: '#a4a4a4'
  }
});