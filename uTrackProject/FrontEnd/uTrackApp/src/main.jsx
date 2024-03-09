import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports.js';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(aws_exports)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </React.StrictMode>,
)
