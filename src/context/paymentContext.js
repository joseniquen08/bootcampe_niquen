import { createContext, useContext, useState } from "react";

const PaymentContext = createContext([]);

export const usePaymentContext = () => useContext(PaymentContext);

const PaymentContextProvider = ({children}) => {

  const [ordenPago, setOrdenPago] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [total, setTotal] = useState(null);
  const [compra, setCompra] = useState(null);

  const clearPayment = () => {
    setOrdenPago(null);
    setNombre(null);
    setFecha(null);
    setTotal(null);
    setCompra(null);
  }

  return (
    <PaymentContext.Provider value={{
      ordenPago, setOrdenPago, nombre, setNombre, fecha, setFecha, total, setTotal, compra, setCompra, clearPayment
    }}>
      {children}
    </PaymentContext.Provider>
  )
}

export default PaymentContextProvider;