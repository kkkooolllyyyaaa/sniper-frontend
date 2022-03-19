import React from "react";
import {connect} from "react-redux";

import CommonHeader from "../CommonHeader/CommonHeader";
import MainPage from "../../pages/MainPage/MainPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import style from './App.module.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = (props) => {
    return (
        <div className={style.App}>
            <CommonHeader/>
            {props.isLoggedIn ? <MainPage/> : <LoginPage/>}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    };
}

export default connect(mapStateToProps)(App);
