import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import app from '../../services/firebase.config';
import Icon from '../Stateless/Icon/Icon';
import { firebase } from '../../services/firebase.config';
import { useAuthContext } from '../../context/authContext';

const SignIn = () => {

  const history = useHistory();

  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { setEmail } = useAuthContext();

  const { email, password } = usuario;

  const handleInputChange = ({ target }) => {
    setUsuario({
      ...usuario,
      [target.name]: target.value,
    });
  }

  const btnSignIn = () => {
    setError(false);
    setBtnLoading(true);
    app.auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setBtnLoading(false);
        if (response.user.displayName) {
          setEmail(response.user.displayName);
          localStorage.setItem('user', JSON.stringify({email: response.user.email, name: response.user.displayName}));
        } else {
          setEmail(response.user.email);
          localStorage.setItem('user', JSON.stringify({email: response.user.email, name: ''}));
        }
        history.push('/');
      })
      .catch((error) => {
        setBtnLoading(false);
        setError(true);
        if(error.code === 'auth/user-not-found') {
          setErrorText('Comprueba que el correo electrónico esté bien escrito o crea una cuenta.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorText('Comprueba que la contraseña esté bien escrita.');
        }
        console.log(error);
      });
  }

  const btnSignInWithGoogle = () => {
    setError(false);
    setBtnLoading(true);
    let google_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(google_provider)
      .then((response) => {
        setBtnLoading(false);
        if (response.user.displayName) {
          setEmail(response.user.displayName);
          localStorage.setItem('user', JSON.stringify({email: response.user.email, name: response.user.displayName}));
        } else {
          setEmail(response.user.email);
          localStorage.setItem('user', JSON.stringify({email: response.user.email, name: ''}));
        }
        history.push('/');
      })
      .catch((error) => {
        setBtnLoading(false);
        setError(true);
        console.log(error);
      })
  }

  const btnSignInWithFacebook = () => {
    setError(false);
    setBtnLoading(true);
    let facebook_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebook_provider)
      .then((response) => {
        setBtnLoading(false);
      })
      .catch((error) => {
        setBtnLoading(false);
        console.log(error);
      })
  }

  return (
    <section className="w-full my-20">
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-2/5 px-4">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words border rounded-3xl">
              <div className="px-6 py-6 mb-0 rounded-t">
                <div className="mb-3 text-center">
                  <h6 className="font-bold text-gray-600">Iniciar sesión con</h6>
                </div>
                <div className="flex items-center justify-center text-center gap-x-3">
                  <button onClick={() => btnSignInWithFacebook()} className="flex items-center justify-center w-12 h-12 text-lg font-bold text-gray-700 uppercase bg-white border outline-none rounded-2xl active:bg-gray-100 focus:outline-none" type="button">
                    <Icon icon={faFacebookF} />
                  </button>
                  <button onClick={() => btnSignInWithGoogle()} className="flex items-center justify-center w-12 h-12 text-lg font-bold text-gray-700 uppercase bg-white border outline-none rounded-2xl active:bg-gray-100 focus:outline-none" type="button">
                    <Icon icon={faGoogle} />
                  </button>
                </div>
                <hr className="mt-6 border-gray-400 border-b-1" />
              </div>
              <div className="flex flex-col items-center justify-center w-full px-10 py-10 pt-0 gap-y-5">
                <div className="text-sm font-bold text-center text-gray-500">O iniciar sesión con tus credenciales</div>
                {
                  error === true ? (
                    <div className="px-4 py-3 bg-red-300 rounded-2xl">
                      <p className="text-sm">Se ha producido un problema al iniciar sesión. {errorText}</p>
                    </div>
                  ) : (
                    <></>
                  )
                }
                <form className="w-full">
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
                        <button className="flex items-center justify-center w-full py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-gray-900 outline-none cursor-default h-11 opacity-70 rounded-2xl focus:outline-none" type="button">
                          <svg className="w-5 h-5 text-gray-100 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </button>
                      ) : (
                        <button onClick={() => btnSignIn()} className="w-full py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-gray-900 outline-none h-11 rounded-2xl focus:outline-none" type="button">Iniciar sesión</button>
                      )
                    }
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6">
              <div className="w-1/2 text-sm"><a href="https://www.google.com/">Forgot password?</a></div>
              <div className="w-1/2 text-sm text-right"><Link to="/register">Registrarse</Link></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn;
