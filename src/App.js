import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import CartListContainer from './components/Cart/CartListContainer';
import Checkout from './components/checkout/Checkout';
import FavoriteListContainer from './components/Favorites/FavoriteListContainer';
import Footer from './components/Footer/Footer';
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import LoginRoute from './components/Login/LoginRoute';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import NavBar from './components/NavBar/NavBar';
import SuccessPayment from './components/payment/SuccessPayment';
import AuthContextProvider from './context/authContext';
import CartContextProvider from './context/cartContext';
import FavoriteContextProvider from './context/favoriteContext';
import ModalContextProvider from './context/modalContext';
import PaymentContextProvider from './context/paymentContext';

function App() {
  return (
    <AuthContextProvider>
      <PaymentContextProvider>
        <ModalContextProvider>
          <FavoriteContextProvider>
            <CartContextProvider>
              <BrowserRouter>
                <div className="h-screen font-inter">
                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="w-full">
                      <NavBar />
                      <Switch>
                        <Route exact path="/">
                          <ItemListContainer path={'/'} />
                        </Route>
                        <LoginRoute path="/login">
                          <SignIn />
                        </LoginRoute>
                        <Route exact path="/register">
                          <SignUp />
                        </Route>
                        <Route exact path="/category/:id">
                          <ItemListContainer path={'/category'} />
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
                        <Route exact path="/checkout">
                          <Checkout />
                        </Route>
                        <Route exact path="/success">
                          <SuccessPayment />
                        </Route>
                      </Switch>
                    </div>
                    <div className="w-full">
                      <Footer />
                    </div>
                  </div>
                </div>
              </BrowserRouter>
            </CartContextProvider>
          </FavoriteContextProvider>
        </ModalContextProvider>
      </PaymentContextProvider>
    </AuthContextProvider>
  );
}

export default App;
