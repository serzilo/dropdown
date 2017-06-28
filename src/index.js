/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

import configureStore from './store/configureStore';
import './styles/styles.css';

const store = configureStore();

render(<AppContainer>
            <App store={store} />
        </AppContainer>,
        document.getElementById('app')
);
