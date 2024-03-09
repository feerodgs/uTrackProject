# uTrack Frontend App

## Documentação para o desenvolvimento do App.

### Até o momento.
O app foi criado com react Vite e está com o cognito configurado, realizei uma estilização básica para vocês entenderem como alterar e realizar as configurações finais. Podem modificar como quiserem toda a parte do app.jsx sem remover o Authenticator, qualquer dúvida podem me chamar.

### Para rodar o projeto
Com Node.js instalado no sistema.

1. Deem um git clone no repositório
```
git clone https://github.com/feerodgs/uTrackProject.git
```

2. Abram a pasta do projeto no terminal (botão direito > Abrir no terminal.) e acessem o projeto react
No windows:
```
cd .\uTrackProject\FrontEnd\uTrackApp
```

No Mac/Linux
```
cd /uTrackProject/FrontEnd/uTrackApp
```

Instalem as dependências:
```
npm install
```

Rodem o App em localhost:
```
npm run dev
```

## Entendendo o projeto

### Estrutura (Apenas os relevantes)
- uTrackApp
    - amplify (SDK da aws, usado para o cognito + gerenciamento de sessão de usuário)
        - amplify content
    - components
        - Criem os componentes das telas aqui. É interessante separar o App em sessões (Nav, sessão 1, sessão 2, sessão 3, Footer)
    - node_modules (dependências do projeto, todas os frameworks instalados ficarão aqui, não precisa mexer)
    - public
        - Adicionem icones e logos aqui
    - src (Contém o App, aqui onde vocês irão codar)
        - App.jsx (Aqui vocês irão chamar os componentes que compõe o App)
        - App.module.css (Css do App.jsx)
        - aws-exports.js (Não mexer)
        - index.css (Css do main.jsx)
        - main.jsx (Arquivo principal onde o App.jsx e seus componentes são renderizados. No geral não precisa mexer.)
    - index.html (Arquivo de HTML principal, em geral não exige alterações, mas o icone e nome do app que fica na aba do navegador fica aqui)

### Código inicial
**Main.jsx**
Raramente vocês irão mudar algo aqui, com excessão de alguns frameworks que exigem englobar o App com alguma tag, exemplo o Authenticator.Provider do Amplify
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports.js';
import { Authenticator } from '@aws-amplify/ui-react';

// imports

Amplify.configure(aws_exports) // config do amplify

ReactDOM.createRoot(document.getElementById('root')).render( // renderização do App
  <React.StrictMode>
    <Authenticator.Provider> // Provider do amplify
      <App /> // App e seus componentes
    </Authenticator.Provider>
  </React.StrictMode>,
)

```


**App.jsx**
```
import styles from './App.module.css'

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession } from 'aws-amplify/auth';

import { useState, useEffect } from 'react';

import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';

I18n.putVocabularies(translations);
I18n.setLanguage('pt');

I18n.putVocabularies({ // Tradução dos campos do form de login do Authenticator
  pt: {
    'Sign In': 'Login',
    'Sign Up': "Cadastrar",
    'Email': "Email"
  }
});

const formFields = { // edição dos campos do form de login do Authenticator
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
  const { route } = useAuthenticator(context => [context.route]); /// Aqui podemos saber se o usuário está ou não autenticado
  const [accessToken, setAccessToken] = useState(null); 
  const [idToken, setIdToken] = useState(null); // idToken que comprova a autenticação do user. (pode ser usado do Bearer Token para apis)

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
      <div className={styles.letter}> // div para fazer a carta em que o form vai sair de dentro
        <Authenticator className={styles.loginForm} formFields={formFields} > // form de login
          {({ signOut, user }) => (
            <div className={styles.container}> // conteúdo que irá aparecer quando o usuário estiver autenticado
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
        {route !== 'authenticated' && <div className={styles.letterdown}> A ideia é essa, ai vcs se viram</div>} // Só aparece com o usuário deslogado.
      </div>
    </div>
  )
}

export default App


```

### Renderizar alguma tag apenas caso o usuário não esteja autenticado
```
{route !== 'authenticated' && <div className={styles.letterdown}> A ideia é essa, ai vcs se viram</div>} // Só aparece com o usuário deslogado.
```

### Renderizar alguma tag apenas caso o usuário esteja autenticado
```
<Authenticator className={styles.loginForm} formFields={formFields} >
    {({ signOut, user }) => (
        <Navbar />
        <Componente1 />
        <Componente2 />
    )}

</Authenticator>

```

## Criar novos componentes
Dentro da pasta components, criem um arquivo chamado NomeDoComponente.jsx (Inicia com letra maíuscula), logo após crie seu arquivo css NomeDoComponente.module.css

### Estrutura básica dos componentes

**NomeDoComponente.jsx**
```
import styles from './NomeDoComponente.module.css';

const NomeDoComponente = () => {
  return (
    <section>  {/* pode ser div, footer, etc */}

        {/* Aqui vocês fazem o html normalmente */}
        <div className={styles.container} >
            <h1 className={styles.h1}>Olá Mundo!</h1>
        </div>
      
    </section>
  )
}

export default NomeDoComponente

```

**NomeDoComponente.module.css**
Aqui vocês fazem o css normalmente usando as classes para passar os atributos
```
.container {
    background-color: red;
}

.h1 {
    color: blue;
}
```

**Como centralizar uma div (Gustavo)**
```
.container {
    background-color: red;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
}
```