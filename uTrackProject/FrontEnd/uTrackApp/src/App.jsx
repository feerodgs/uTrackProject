import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession } from 'aws-amplify/auth';
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
      label: 'Confirme sua senha',
      placeholder: 'Por favor, confirme sua senha',
    },
  }
}

function App() {
  const { route } = useAuthenticator(context => [context.route]);
  const [accessToken, setAccessToken] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const currentSession = async () => {
      try {
        const session = await fetchAuthSession();
        setAccessToken(session.tokens.accessToken.toString());
        setIdToken(session.tokens.idToken.toString());
      } catch (err) {
        console.log(err);
      }
    };

    currentSession();
  }, []);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.App}>
      <img className={styles.logo} src="/logo.png" alt="Logotipo uTrack" />
      <div className={styles.letter}>
        <div className={`${styles.loginForm} ${isExpanded ? styles.expanded : ''}`}>
          <Authenticator formFields={formFields}>
            {({ signOut, user }) => (
              <div className={styles.container}>
                <p>
                  Olá {user.username}, bem vindo ao uTrack.
                </p>
                <p>Email: {user.signInDetails.loginId}</p>
                <button onClick={signOut}>Sair</button>
              </div>
            )}
          </Authenticator>
        </div>
        {route !== 'authenticated' && <div className={styles.letterdown} onClick={toggleExpansion}></div>}
        {route !== 'authenticated' && <div className={styles.letterfront}></div>}
      </div>
    </div>
  )
}

export default App;
