import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession } from 'aws-amplify/auth';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';
import { FaMoon, FaSun } from "react-icons/fa";

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

const mockData = [
  {
    codigoRastreio: "QQ830773725BR",
    produto: "Produto A",
    previsaoEntrega: "2024-03-22",
    atualizacoes: [
      {
        data: "2024-03-20T12:08:19",
        descricao: "Objeto entregue ao destinatário",
        unidade: "Unidade de Distribuição",
        cidade: "ERECHIM",
        uf: "RS"
      },
      {
        data: "2024-03-20T08:52:12",
        descricao: "Objeto saiu para entrega ao destinatário",
        unidade: "Unidade de Distribuição",
        cidade: "ERECHIM",
        uf: "RS"
      },
      {
        data: "2024-03-15T14:05:12",
        descricao: "Objeto em transferência - por favor aguarde",
        unidade: "Unidade de Tratamento",
        cidade: "PASSO FUNDO",
        uf: "RS"
      },
      {
        data: "2024-03-14T03:30:28",
        descricao: "Objeto em transferência - por favor aguarde",
        unidade: "Unidade de Tratamento",
        cidade: "CAJAMAR",
        uf: "SP"
      },
      {
        data: "2024-03-13T00:03:58",
        descricao: "Objeto em transferência - por favor aguarde",
        unidade: "Agência dos Correios",
        cidade: "SANTO ANDRE",
        uf: "SP"
      },
      {
        data: "2024-03-12T20:07:50",
        descricao: "Objeto postado após o horário limite da unidade",
        unidade: "Agência dos Correios",
        cidade: "SANTO ANDRE",
        uf: "SP"
      }
    ]
  }
];

function App() {
  const { route } = useAuthenticator(context => [context.route]);
  const [accessToken, setAccessToken] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [encomendas, setEncomendas] = useState(mockData);
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [isMoonIcon, setIsMoonIcon] = useState(true);

  const changeIcon = () => {
    const newIsMoonIcon = !isMoonIcon;
    setIsMoonIcon(newIsMoonIcon);

    if (newIsMoonIcon) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }

    return newIsMoonIcon;
  };

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
      <div className='slider-container' onClick={changeIcon}>
        <div className={`slider ${isMoonIcon ? 'slide-left' : 'slide-right'}`}>
          {isMoonIcon ? <FaMoon size={24} /> : <FaSun size={24} />}
        </div>
      </div>
      <div className={styles.letter}>
        {route !== 'authenticated' && <div className={styles.lettertop}></div>}
        {route !== 'authenticated' && <div className={styles.lettercorner}></div>}
        <div className={styles.letterbody}>
          <Authenticator formFields={formFields} className={styles.formulario}>
            {({ signOut, user }) => (
              <div>
                <main>
                  <h1 className={styles.title}>Sistema de rastreio de encomendas</h1>
                  <div className={isMoonIcon ? styles.box : styles.boxDark}>
                    <h3 className={styles.subtitulo}>Pesquisar encomenda:</h3>
                    <input className={styles.textInput} type="text" placeholder="Insira o código de rastreio" />
                    <button className={styles.submitBtn}>Rastrear</button>
                  </div>
                  {selectedTracking && (
                    <div className={isMoonIcon ? styles.trackBox : styles.trackBoxDark}>
                      <div>
                        <h3 className={styles.subtitulo}>{selectedTracking.produto}</h3>
                        <a href="#" onClick={() => setSelectedTracking(null)}>Close</a>
                        <p>Código de Rastreio: {selectedTracking.codigoRastreio}</p>
                        <p>Previsão de Entrega: {selectedTracking.previsaoEntrega}</p>
                        {selectedTracking.atualizacoes.map((atualizacao, index) => (
                          <div key={index}>
                            <p>{atualizacao.descricao}</p>
                            <p>{atualizacao.cidade} - {atualizacao.uf}</p>
                            <b><p>{new Date(atualizacao.data).toLocaleString()}</p></b>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </main>
                <button onClick={signOut}>Sair</button>
              </div>
            )}
          </Authenticator>
        </div>
        {route !== 'authenticated' && <div className={styles.letterdown}></div>}
        {route !== 'authenticated' && <div className={styles.letterfront}></div>}
      </div>
    </div>
  );
}

export default App;
