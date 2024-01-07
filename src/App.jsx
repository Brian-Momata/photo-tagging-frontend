import React from 'react';
import './App.css';
import GameInstructions from './GameInstructions';
import Footer from './Footer';
import MainGame from './MainGame';

const App = () => {
  return (
    <div className="container">
      <h1>Photo Tagging Game</h1>
      < GameInstructions />
      < MainGame />
      < Footer />
    </div>
  );
};

export default App;
