import React, { useState } from 'react'
import './login.css';
import { Link } from 'react-router-dom';

const Login = ({history}) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [disable, setDisable] = useState(true);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const validateInputs = () => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const validateEmail = regex.test(login.email);
    console.log(validateEmail)
    const disable = (!validateEmail || login.password < 4);
    validateEmail ? setErrorEmail(false) : setErrorEmail(true);
    login.password.length > 2 ? setErrorPassword(false) : setErrorPassword(true);
    setDisable(disable);
  }

  const handleUser = ({ target }) => {
     setLogin({
      ...login,
      [target.name]: target.value,
     })
     validateInputs();
     login.password.length === 0 && setErrorPassword(false);
     login.email === '' && setErrorEmail(false);
     console.log(errorEmail)
  }
  return (
    <section className='login' style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://media.zenfs.com/en/evening_standard_239/efa6e1afe3253996abe03d3539c64f00)`,
      }}>
        <div className='login-background'>
        <div className='login-div-logo'>
            <a href="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2014_logo.svg" alt="Netflix" className='login-logo' />
            </a>
        </div>
        <form action="" className='login--form'>
        <h2 className='login--title'>Entrar</h2>
          <input 
          type="email" 
          className={`login--input ${errorEmail && 'login-error-input'}`}
          placeholder='Email ou número de telefone'
          onChange={handleUser}
          value={login.email}
          name='email' />
          {errorEmail && 
          <p className='login-error'>Informe um email ou número de telefone válido.</p>
          }
          <input 
          type="password" 
          className={`login--input ${errorPassword && 'login-error-input'} `}
          placeholder='Senha'
          onChange={handleUser}
          value={login.password}
          name='password' />
          {errorPassword && 
          <p className='login-error password'>A senha deve ter entre 4 e 60 caracteres.</p>
          }
          <button 
          type='button'
          className='login--button' 
          onClick={() => history.push('/browse')}
          disabled={disable}>
          Entrar
          </button>
          <div className='login-checkbox-remenber'>
            <label htmlFor="remember" className='login-checkbox-title'>
            <input type="checkbox" name="" id="remember" className='login-checkbox' />
            Lembre-se de mim
            </label>
            <Link className='login-help'>Precisa de ajuda?</Link>
          </div>
          <div className='login-sign'>
          <p>Novo por aqui?</p>
          <Link className='login-sign-link'
          >Assine agora</Link>
          </div>
        </form>
        </div>
        
    </section>
  )
}

export default Login