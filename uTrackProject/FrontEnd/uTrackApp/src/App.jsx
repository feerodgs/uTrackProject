import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession } from 'aws-amplify/auth';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';

import Home from './components/Home';

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
      placeholder: 'Digite a senha:',
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Busca os dados da API
  // Para funcionar a busca pela API quem for ajustar descomente o código abaixo, como será repassado a APi ainda tem que ser ajustado para coletar corretamente algumas informações como o nome do produto...
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.cepcerto.com/ws/encomenda-json/QQ830773725BR/45eae6254b24ec6f27ab9ded556b9b538223939f/'); // NOTA ver com felipa se vão passar o ID do cliente e adicionar neste link
        const data = await response.json();
        setEncomendas(data); // Ajuste a estrutura dos dados conforme necessário
      } catch (error) {
        console.log('Erro ao buscar dados de rastreamento:', error);
      }
    };

    fetchData();
  }, []);
  */

  return (
    <div className={styles.App}>
      {route !== 'authenticated' &&<img className={styles.logo} src="/logo.png" alt="Logotipo uTrack" />}
      <div className={styles.letter}>
        {/* back triangle */}
        {route !== 'authenticated' && <div className={styles.lettertop}></div>}
        {/* back div */}
        {route !== 'authenticated' && <div className={styles.letterback}></div>}
        <div className={`${styles.loginForm} ${isExpanded ? styles.expanded : ''}`}>
          <Authenticator formFields={formFields}>
            {({ signOut, user }) => (
              <div className={styles.container}>
                <Home />
                <button onClick={signOut}>Meter o pé</button>
              </div>
            )}
          </Authenticator>
        </div>
        {/* front div */}
        {route !== 'authenticated' && <div className={styles.letterdown}></div>}
        {/* front triangle */}
        {route !== 'authenticated' && <div className={styles.letterfront}></div>}
      </div>
    </div>
  )
}

export default App;
