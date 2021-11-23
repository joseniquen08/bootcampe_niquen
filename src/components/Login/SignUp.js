import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import app from '../../services/firebase.config';

const SignUp = () => {

  const history = useHistory();

  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const { setEmail } = useAuthContext();

  const { email, password } = usuario;

  const handleInputChange = ({ target }) => {
    setUsuario({
      ...usuario,
      [target.name]: target.value,
    });
  }

  const btnSignUp = () => {
    setBtnLoading(true);
    app.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.user.displayName) {
          setEmail(response.user.displayName);
        } else {
          setEmail(response.user.email);
        }
        console.log(response);
        history.push('/');
      })
      .catch((error) => {
        console.log(error.code);
        setBtnLoading(false);
      })
  }

  return (
    <section className="w-full">
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-2/5 px-4 pt-24">
            <div className="relative flex flex-col w-full min-w-0 mb-4 break-words border rounded-3xl">
              <div className="flex-auto px-10 py-10 pt-10">
                <div className="mb-6 text-xl font-bold text-center text-gray-500">Registrarse</div>
                <form>
                  <div className="relative w-full mb-3">
                    <label className="block mb-1 text-xs font-bold text-gray-700 uppercase" htmlFor="grid-password">Email</label>
                    <input type="email" value={email} name="email" onChange={(e) => {handleInputChange(e)}} className="w-full px-4 py-2 mt-1 text-sm border rounded-xl focus:outline-none"/>
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block mb-1 text-xs font-bold text-gray-700 uppercase" htmlFor="grid-password">Contraseña</label>
                    <input type="password" value={password} name="password" onChange={(e) => {handleInputChange(e)}} className="w-full px-4 py-2 mt-1 text-sm border rounded-xl focus:outline-none"/>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                    <input id="customCheckLogin" type="checkbox" className="w-5 h-5 ml-1 text-gray-800 form-checkbox" style={{transition: 'all 0.15s ease 0s'}} /><span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span></label>
                  </div>
                  <div className="mt-6 text-center">
                    {
                      btnLoading === true ? (
                        <button className="flex items-center justify-center w-full py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-gray-900 shadow outline-none cursor-default h-11 opacity-70 rounded-2xl focus:outline-none" type="button">
                          <svg className="w-5 h-5 text-gray-100 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </button>
                      ) : (
                        <button onClick={() => btnSignUp()} className="w-full py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-gray-900 shadow outline-none h-11 rounded-2xl focus:outline-none" type="button">Regístrate</button>
                      )
                    }
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              <div className="w-full text-sm text-center"><Link to="/login">Iniciar sesión</Link></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp;
