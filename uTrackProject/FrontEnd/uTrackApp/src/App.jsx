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
      placeholder: 'Digite a senha:',
      isRequired: false,
    },
    confirm_password: {
      label: 'Confirme sua senha',
      placeholder: 'Por favor, confirme sua senha',
    },
  }
}

// Exemplo de dados simulados (mockData)
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
  // Adicione mais rastreios conforme necessário
];

function App() {
  const { route } = useAuthenticator(context => [context.route]);
  const [accessToken, setAccessToken] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [encomendas, setEncomendas] = useState(mockData); // Usei estado para armazenar as encomendas, OBS: retirar o mockData com a APi funcionando
  const [selectedTracking, setSelectedTracking] = useState(null); // controla o rastreio selecionado

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
                  {/* gerador dos blocos */}
                  <div className={styles.section}>
                    {encomendas.map((encomenda, index) => (
                      <div className={styles.box} key={index}>
                        <h3 className={styles.subtitulo}>{encomenda.produto}</h3>
                        <p>Código de Rastreio:</p>
                        <div className={styles.legenda}>
                          <p>{encomenda.codigoRastreio}</p>
                        </div>
                        <p>Previsão de Entrega:</p>
                        <div className={styles.legenda}>
                          <p>{encomenda.previsaoEntrega}</p>
                        </div>
                        <a href="#" onClick={() => setSelectedTracking(encomenda)}>Ver mais</a>
                        <br/><br />
                      </div>
                    ))}
                  </div>

                  {/* Div com o rastreio completo */}
                  {selectedTracking && (
                    <div className={styles.trackBox}>
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
        {/* front div */}
        {route !== 'authenticated' && <div className={styles.letterdown}></div>}
        {/* front triangle */}
        {route !== 'authenticated' && <div className={styles.letterfront}></div>}
      </div>
    </div>
  )
}

export default App;
