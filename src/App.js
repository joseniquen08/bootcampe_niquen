import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import FavoriteListContainer from './components/Favorites/FavoriteListContainer';
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';

function App() {

  const [favoritos, setFavoritos] = useState([]);

  return (
    <BrowserRouter>
      <NavBar favoritos={favoritos} />
      <Switch>
        <Route exact path="/">
          <ItemListContainer favoritos={favoritos} setFavoritos={setFavoritos} />
        </Route>
        <Route exact path="/:type/:id">
          <ItemDetailContainer favoritos={favoritos} setFavoritos={setFavoritos} />
        </Route>
        <Route exact path="/favoritos">
          <FavoriteListContainer favoritos={favoritos} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
