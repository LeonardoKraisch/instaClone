import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from './src/components/Header';
import Post from './src/components/Post';

const App = () => {

  const comments = [{
    nickname: 'Joana Elena Silva',
    comment: 'Excelente Foto!'
  }, {
    nickname: 'Rafael Gustavo Pereira',
    comment: 'Muito ruim! Faço melhor...'
  }]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Post image={require('./assets/imgs/fence.jpg')} 
        comments={comments} />
    </SafeAreaView>
  );
};



export default App;
