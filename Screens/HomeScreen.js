import  { React,  Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "...Loading",
      lexicalCategory :'',
      definition : ""
    };
  }

  getWord=(text)=>{
   
         var text = text.toLowerCase()

    try {
      var word = dictionary[text]["word"]
      var lexicalCategory = dictionary[text]["lexicalCategory"]
      var definition = dictionary[text]["definition"]

      this.setState({
        "word": word,
        "lexicalCategory": lexicalCategory,
        "definition": definition
      });
    } catch(err){
      alert("Sorry !,this word is not available for now.");
      this.setState({
        'text': '',
        'isSearchPressed': false,
      });
    }
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'blue'}
            centerComponent={{
              text: 'Treasure of Words',
              style: { color: 'darkorange', fontSize: 20, fontWeight: '800' },
            }}
          />

          <Image
          style = {styles.bookImage}
         source={require('../Assets/bookImg.png')}
          />

          <TextInput
            style={styles.inputbox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: "...Loading",
                lexicalCategory: '',
                examples: [],
                definition: "",
              });
            }}
            value={this.state.text}
          />

         

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}           
          >

            <Text style={styles.buttonText}>Search
           
            </Text>

          </TouchableOpacity>
          <View>
          <View style={styles.outputBox}>
            <Text style={{ fontSize: 20 }}>
              {this.state.isSearchPressed && this.state.word === '...Loading'
                ? this.state.word
                : ""}
            </Text>
            {this.state.word !== "...Loading" ? (
              <View style={{ justifyContent: 'center', marginLeft: 20 }}>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={styles.title}>Word : {""}</Text>
                  <Text style={{ fontSize: 20 }}>{this.state.word}</Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={styles.title}>Type : {''}</Text>
                  <Text style={{ fontSize: 20 }}>
                    {this.state.lexicalCategory}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={styles.title}>Definition : {''}</Text>
                  <Text style={{ fontSize: 20 }}>{this.state.definition}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
  },
  bookImage: {
    width: 150,
    height: 110,
    marginLeft: 95,
    marginBottom: 25,
    marginTop: 20,
    marginEnd: 95,
  },

  searchbtnImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },

  inputbox: {
    marginBottom: 80,
    width: 80,
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    //fontWeight: '600',
    color:'green',
    borderWidth: 60,
    borderColor: 'orange',
  },

  outputBox: {
    marginBottom: 80,
    width: 80,
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    //fontWeight: '600',
    color:'green',
    borderWidth: 60,
    borderColor: 'brown',
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: '700',
    color: 'red',
    //marginBottom: 100,
  },

  searchButton: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
});

