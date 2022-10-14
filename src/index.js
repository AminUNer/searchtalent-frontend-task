import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoot from './components/Root';
import {persistor, store} from './redux/store/configureStore';
import appTheme from './styles/theme';
import {Helmet} from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={appTheme}>
                        <Helmet>
                            <title>Doctors List</title>
                            <meta name="description" content="A card list view for doctors around the world" />
                        </Helmet>
                        <AppRoot />
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
