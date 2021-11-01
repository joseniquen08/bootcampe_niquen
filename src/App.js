import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import CartListContainer from './components/Cart/CartListContainer';
import FavoriteListContainer from './components/Favorites/FavoriteListContainer';
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import CartContextProvider from './context/cartContext';
import FavoriteContextProvider from './context/favoriteContext';

function App() {
  return (
    <FavoriteContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <div className="font-inter">
            <NavBar />
            <Switch>
              <Route exact path="/">
                <ItemListContainer />
              </Route>
              <Route exact path="/:type/:id">
                <ItemDetailContainer />
              </Route>
              <Route exact path="/favoritos">
                <FavoriteListContainer />
              </Route>
              <Route exact path="/cart">
                <CartListContainer />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </CartContextProvider>
    </FavoriteContextProvider>
  );
}

export default App;
