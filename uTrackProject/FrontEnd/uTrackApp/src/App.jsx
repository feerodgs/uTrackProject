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
      label: 'Confirme a senha', // Trocar aqui
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

  return (
    <div className={styles.App}>
      <img className={styles.logo} src="/logo.png" alt="Logotipo uTrack" />
      <div className={styles.letter}>
        {/* back triangle */}
        {route !== 'authenticated' && <div className={styles.lettertop}></div>}
        {/* back div */}
        {route !== 'authenticated' && <div className={styles.letterback}></div>}
        <div className={`${styles.loginForm} ${isExpanded ? styles.expanded : ''}`}>
          <Authenticator formFields={formFields}>
            {({ signOut, user }) => (
              <div className={styles.container}>
                <main className={styles.main}>
                  <div className={styles.filterSection}>
                    <div className={styles.filterHeader}>
                      <a href="#" className={styles.filterBtn}><i>A</i> Filtros</a>
                      <a href="#" className={styles.filterBtn}><i>A</i> Adicionar</a>
                    </div>
                    <div className={styles.filter}>
                      <label htmlFor="produto" className={styles.label}>Produto</label>
                      <input type="text" className={styles.textInput} placeholder='texto' id='produto'/>
                      <label htmlFor="codRastreio" className={styles.label}>Cod. Rastreio</label>
                      <input type="text" className={styles.textInput} placeholder='texto' id='codRastreio'/>
                      <label htmlFor="staus" className={styles.label}>Status</label>
                      <input type="text" className={styles.textInput} placeholder='texto' id='status'/>
                      <label htmlFor="deDat" className={styles.label}>De</label>
                      <input type="text" className={styles.textInput} placeholder='texto' id='deDat'/>
                      <label htmlFor="ateDat" className={styles.label}>Até</label>
                      <input type="text" className={styles.textInput} placeholder='texto' id='ateDat'/>
                      <input type="text" className={styles.submitBtn} value="Pesquisar"/>
                    </div>
                  </div>
                  <div className="section">
                    <div className={styles.box}>
                      <h3 className={styles.subtitulo}>Produto</h3>
                      <p>Código de rastreio</p>
                      <div className={styles.legenda}><p>12345678</p></div>
                      <p>Previsão de entrega</p>
                      <div className={styles.legenda}><p>01/01/0101</p></div>
                      <a href="#">ver mais</a>
                    </div>
                  </div>
                </main>
                <button onClick={signOut}>Sair</button>
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
