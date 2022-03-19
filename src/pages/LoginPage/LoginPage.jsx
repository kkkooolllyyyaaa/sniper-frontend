import React, {useEffect, useState, useRef} from "react";
import {connect} from "react-redux";

import '/node_modules/primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Password} from "primereact/password";
import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';


import {login, register} from "../../api/authAPI";
import pointsAPI from "../../api/pointsAPI";
import {logInAction, logOutAction, setPointsAction, changeRadiusAction} from "../../store/action/actionCreator";
import styles from './LoginPage.module.css';

const TITLE = "Login";

const LoginPage = (props) => {
    useEffect(() => {
        document.title = TITLE
    }, []);

    let [log, setLog] = useState("");
    let [pass, setPass] = useState("");

    const toast = useRef(null);
    const showLoginError = () => {
        toast.current.show({severity: 'error', summary: 'Login', detail: 'Incorrect username or password', life: 3000});
    };

    const showServerShutDownError = () => {
        toast.current.show({severity: 'error', summary: 'Server', detail: 'Server is unavailable', life: 3000});
    }

    const showPointsError = () => {
        toast.current.show({severity: 'error', summary: 'Points', detail: 'Unable to get points', life: 3000});
    };

    const showUnexpectedAnswerError = () => {
        toast.current.show({severity: 'error', summary: 'Error', detail: 'Unexpected error from server', life: 3000});
    };

    const showRegisterError = () => {
        toast.current.show({
            severity: 'error', summary: 'Register', detail: 'Unable to register with this username', life: 3000
        });
    };

    const validateForm = () => {
        return log.length > 3 && pass.length > 4;
    };

    const onLogin = () => {
        login(log, pass).then(response => {
            if (response.status === 200) {
                props.dispatchLogin({
                    login: log,
                    password: pass
                });
                pointsAPI.getPoints().then(response => {
                    props.dispatchSetPoints(response.data);
                }).catch(e => {
                    showPointsError();
                });
            } else {
                showUnexpectedAnswerError();
            }
        }).catch(e => {
            if (e.message === 'Network Error')
                showServerShutDownError();
            else
                showLoginError();
        })
    };

    const onRegister = () => {
        register(log, pass).then(response => {
            if (response.status === 200) {
                onLogin();
            } else {
                showUnexpectedAnswerError();
            }
        }).catch(e => {
            showRegisterError();
        })
    };

    return (
        <div className="Login">
            <span>
                <label className="block p-1 m-1" htmlFor="username">Username</label>
                <InputText className="" id="username" value={log} onChange={(e) => setLog(e.target.value)}/>
            </span>
            <br/>
            <span>
                <label className="block p-1 m-1" htmlFor="password">Password</label>
                <Password className="" id="password" value={pass} onChange={(e) => setPass(e.target.value)}
                          feedback={false}/>
            </span>
            <br/>
            <div className={styles.buttons}>
                <Toast ref={toast}/>
                <Button className="ml-auto" type="submit" label="Register"
                        disabled={!validateForm()} onClick={onRegister}/>
                <Button className="mr-auto" type="submit" label="Login"
                        disabled={!validateForm()} onClick={onLogin}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        password: state.auth.password,
        isLoggedIn: state.auth.isLoggedIn,
    };
}

const mapDispatchToProps = {
    dispatchLogOut: logOutAction,
    dispatchLogin: logInAction,
    dispatchSetPoints: setPointsAction,
    dispatchChangeRadius: changeRadiusAction
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);