import { createContext, useContext, useState } from 'react';

const ModalContext = createContext([]);

export const useModalContext = () => useContext(ModalContext);

const ModalContextProvider = ({children}) => {

  const [modal, setModal] = useState(true);

  const showModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  return (
    <ModalContext.Provider value={{
      modal, showModal, closeModal
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider;