import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import CartListContainer from './components/Cart/CartListContainer';
import Checkout from './components/checkout/Checkout';
import FavoriteListContainer from './components/Favorites/FavoriteListContainer';
import Footer from './components/Footer/Footer';
import ItemDetailContainer from './components/ItemListContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import Icon from './components/Stateless/Icon/Icon';
import CartContextProvider from './context/cartContext';
import FavoriteContextProvider from './context/favoriteContext';
import ModalContextProvider, { useModalContext } from './context/modalContext';

function App() {

  const { modal, closeModal } = useModalContext();

  console.log(modal);

  return (
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
                    <Route exact path="/cheackout">
                      <Checkout />
                    </Route>
                  </Switch>
                </div>
                <div className="w-full">
                  <Footer />
                </div>
              </div>
              {
                modal === true ? (
                  <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                      <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl rounded-3xl sm:max-w-md sm:w-full">
                        <div className="px-4 py-4 bg-white sm:p-6 sm:pb-4">
                          <div className="">
                            <div className="flex items-center justify-center flex-shrink-0 py-4 mx-auto text-green-500 rounded-full text-7xl">
                              <Icon icon={faCheckCircle} />
                            </div>
                            <div className="mt-3 text-center sm:mt-0">
                              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                                ¡Agregado al carrito!
                              </h3>
                              <div className="mt-8">
                                <p className="text-sm text-gray-500">
                                  {
                                    /*items > 1 ? `${items} cupos de ${nombre}` : `${items} cupo de ${nombre}`*/
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center px-4 py-6">
                          <button type="button" onClick={() => closeModal()} className="inline-flex justify-center w-auto px-8 py-2 text-lg font-medium text-white bg-blue-600 border border-transparent shadow-sm rounded-2xl hover:bg-blue-700">
                            Listo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (<></>)
              }
            </div>
          </BrowserRouter>
        </CartContextProvider>
      </FavoriteContextProvider>
    </ModalContextProvider>
  );
}

export default App;
