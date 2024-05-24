import styles from './App.module.css'

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession } from 'aws-amplify/auth';

import { useState, useEffect } from 'react';

import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';

I18n.putVocabularies(translations);
I18n.setLanguage('pt');

I18n.putVocabularies({
  pt: {
    'Sign In': 'Login',
    'Sign Up': "Cadastrar",
    'Email': "Email"
  }
});

const formFields = {
  signIn: {
    password: {
      placeholder: 'Digite sua senha',
    },
  },
  signUp: {
    password: {
      placeholder: 'Digite sua senha:',
      isRequired: false,
    },
    confirm_password: {
      label: 'Confirme a senha', // Trocar aqui
      placeholder: 'Por favor, confirme sua senha',
    },
  }
}


function App() {
  const { route } = useAuthenticator(context => [context.route]);
  const [accessToken, setAccessToken] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    const currentSession = async () => {
      try {
        const session = await fetchAuthSession(); {/* A session pega os tokens de autenticação do usuário quando ele efetua o login */ }
        setAccessToken(session.tokens.accessToken.toString());
        setIdToken(session.tokens.idToken.toString());
      } catch (err) {
        console.log(err);
      }
    };

    currentSession();
  }, []);


  return (
    <div className={styles.App}>
      <img className={styles.logo} src="/vite.svg" alt="Logotipo uTrack" /> {/* basta colocar a logo na pasta public e chamar ela com /nomeDoArquivo.svg */}
      {route !== 'authenticated' && <h1 className='h1-bold'>uTrack</h1>} {/* Renderiza o componente com o usuário deslogado. */}
      <div className={styles.letter}>
        <Authenticator className={styles.loginForm} formFields={formFields} >
          {({ signOut, user }) => (
            <div className={styles.container}>
              {/* Aqui podemos renderizar os componentes que irão compor o App */}
              <p>
                Olá {user.username}, bem vindo ao uTrack. {/* Cada user tem um user.username único, útil para salvar no banco de dados como a identificação de cada user. */}
              </p>
              {/* O email do usuário pode ser acessado em {user.signInDetails.loginId} */}
              <p>Email: {user.signInDetails.loginId}</p>
              {/*
                <p>{idToken}</p>
                <p>{accessToken}</p> {/* Tokens de sessão do usuário, usados para mandar como uma "prova" de que o usuário está autenticado para as apis */}
              <button onClick={signOut}>Sair</button>
            </div>
          )}
        </Authenticator>
        {route !== 'authenticated' && <div className={styles.letterdown}> A ideia é essa, ai vcs se viram</div>}
      </div>
    </div>
  )
}

export default App
