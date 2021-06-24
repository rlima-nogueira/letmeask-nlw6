import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';



function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/rooms/news" component={NewRoom} />

    </BrowserRouter>
  );
}

export default App;
