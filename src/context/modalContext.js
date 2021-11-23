import { createContext, useContext, useState } from 'react';

const ModalContext = createContext([]);

export const useModalContext = () => useContext(ModalContext);

const ModalContextProvider = ({children}) => {

  const [modal, setModal] = useState(false);
  const [infoItem, setInfoItem] = useState([]);

  const showModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
    setInfoItem([]);
  }

  const addInfoItemModal = (item) => {
    setInfoItem([...infoItem, item]);
  }

  return (
    <ModalContext.Provider value={{
      modal, showModal, closeModal, addInfoItemModal, infoItem
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider;