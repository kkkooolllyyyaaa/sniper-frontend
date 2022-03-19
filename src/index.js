import React from 'react';
import ReactDOM from 'react-dom';
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

import {persistor} from "./store/store";
import store from "./store/store";
import App from "./components/App/App";

ReactDOM.render(
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
            <App/>
        </Provider>
    </PersistGate>
    ,
    document.getElementById('root')
);
