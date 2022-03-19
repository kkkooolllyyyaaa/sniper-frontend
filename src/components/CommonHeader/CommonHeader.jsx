import React from "react"
import {connect} from "react-redux";

import {logout} from "../../api/authAPI";
import {logOutAction} from "../../store/action/actionCreator";
import style from './CommonHeader.module.css'

const nameAndGroup = 'Tsypandin Nikolai P3210';
const variant = 1034;

const CommonHeader = (props) => {
    const logoutFunc = () => {
        logout();
        props.dispatchLogOut();
    };

    const logoutButton = props.isLoggedIn ? (
        <a className={style.link} onClick={logoutFunc} href="">{props.login}</a>) : '';

    return (
        <header className={style.header}>
            <div>
                <p className={style.nameAndGroup}>{nameAndGroup}</p>
            </div>

            <div className={style.nav}>
                <a className={style.link} href=''>Variant: {variant}</a>
                {logoutButton}
            </div>
        </header>
    );
};

function mapStateToProps(state) {
    return {
        login: state.auth.login,
        isLoggedIn: state.auth.isLoggedIn,
    };
}

const mapDispatchToProps = {
    dispatchLogOut: logOutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader);