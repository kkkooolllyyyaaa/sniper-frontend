import React, {useRef, useState} from 'react'
import {connect} from "react-redux";

import {RadioButton} from 'primereact/radiobutton';
import {Slider} from "primereact/slider";
import {Toast} from "primereact/toast";
import {Button} from "primereact/button";

import {setPointsAction, addPointAction, changeRadiusAction} from "../../store/action/actionCreator";
import pointsAPI from "../../api/pointsAPI";
import styles from './PointForm.module.css'

const PointForm = (props) => {
    let [x, setX] = useState("");
    let [y, setY] = useState(0.0);
    let [actualY, setActualY] = useState(-5.0);
    let [radius, setRadius] = useState(props.radius);

    const calculateActualY = (y) => {
        return Math.round((y / 10 - 5) * 100) / 100;
    };
    const processY = (value) => {
        setY(value);
        setActualY(calculateActualY(value));
    };

    const processR = (value) => {
        props.dispatchChangeRadius(value);
        setRadius(value);
    };

    const toast = useRef(null);
    const showFormError = () => {
        toast.current.show({
            severity: 'error', summary: 'Error', detail: 'Invalid data or server is unavailable', life: 2000
        });
    };
    const showClearError = () => {
        toast.current.show({
            severity: 'error', summary: 'Clear', detail: 'Unable to clear entries', life: 2000
        });
    };
    const showUnexpectedAnswerError = () => {
        toast.current.show({severity: 'error', summary: 'Error', detail: 'Unexpected error from server', life: 3000});
    };
    const showServerShutDownError = () => {
        toast.current.show({severity: 'error', summary: 'Server', detail: 'Server is unavailable', life: 3000});
    }

    const validateForm = () => {
        const xValid = x != null && x !== "";
        const rValid = radius != null && radius !== "";
        return xValid && rValid;
    };

    const checkEntry = () => {
        pointsAPI.check(x, actualY, radius).then(response => {
            if (response.status === 200) {
                props.dispatchAddPoint(response.data);
            } else {
                showUnexpectedAnswerError();
            }
        }).catch(e => {
            if (e.message === 'Network Error')
                showServerShutDownError();
            else
                showFormError();
        });
    };

    const clearEntries = () => {
        pointsAPI.clear().then(response => {
            if (response.status === 200) {
                props.dispatchSetPoints([]);
                setRadius("");
            } else {
                showUnexpectedAnswerError();
            }
        }).catch(e => {
            showClearError();
        })
    };

    return (
        <div className={styles.pointForm}>
            <h3>X value:</h3>
            <table className={styles.xRadioTable}>
                <tbody>
                <tr>
                    <td>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x1" name="city" value="-4" onChange={(e) => setX(e.value)}
                                         checked={x === '-4'}/>
                            <label htmlFor="x1">-4</label>
                        </div>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x2" name="city" value="-3" onChange={(e) => setX(e.value)}
                                         checked={x === '-3'}/>
                            <label htmlFor="x2">-3</label>
                        </div>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x3" name="city" value="-2" onChange={(e) => setX(e.value)}
                                         checked={x === '-2'}/>
                            <label htmlFor="x3">-2</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x4" name="city" value="-1" onChange={(e) => setX(e.value)}
                                         checked={x === '-1'}/>
                            <label htmlFor="x4">-1</label>
                        </div>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x5" name="city" value="0" onChange={(e) => setX(e.value)}
                                         checked={x === '0'}/>
                            <label htmlFor="x5"> 0</label>
                        </div>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x6" name="city" value="1" onChange={(e) => setX(e.value)}
                                         checked={x === '1'}/>
                            <label htmlFor="x6"> 1</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x7" name="city" value="2" onChange={(e) => setX(e.value)}
                                         checked={x === '2'}/>
                            <label htmlFor="x7"> 2</label>
                        </div>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x8" name="city" value="3" onChange={(e) => setX(e.value)}
                                         checked={x === '3'}/>
                            <label htmlFor="x8"> 3</label>
                        </div>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="x9" name="city" value="4" onChange={(e) => setX(e.value)}
                                         checked={x === '4'}/>
                            <label htmlFor="x9"> 4</label>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <h3>Y value:</h3>
            <h4 className="mt-0 mb-0 font-normal">{actualY}</h4>

            <Slider className="w-4 ml-auto mr-auto mt-2" value={y} onChange={(e) => processY(e.value)} step={1}/>

            <h3>Radius:</h3>

            <table className={styles.rRadioTable}>
                <tbody>
                <tr>
                    <td>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="r1" name="city" value="1" onChange={(e) => processR(e.value)}
                                         checked={props.radius === '1'}/>
                            <label htmlFor="r1">1</label>
                        </div>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="r3" name="city" value="3" onChange={(e) => processR(e.value)}
                                         checked={props.radius === '3'}/>
                            <label htmlFor="r3">3</label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="r2" name="city" value="2" onChange={(e) => processR(e.value)}
                                         checked={props.radius === '2'}/>
                            <label htmlFor="r2">2</label>
                        </div>
                        <div className="field-radiobutton ml-2 mb-3">
                            <RadioButton inputId="r4" name="city" value="4" onChange={(e) => processR(e.value)}
                                         checked={props.radius === '4'}/>
                            <label htmlFor="r4">4</label>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className={styles.buttons}>
                <Toast ref={toast}/>
                <Button className="ml-auto" type="submit" label="check"
                        disabled={!validateForm()} onClick={checkEntry}/>
                <Button className="mr-auto" type="submit" label="clear"
                        onClick={clearEntries}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        points: state.points.points,
        radius: state.points.radius
    };
}

const mapDispatchToProps = {
    dispatchSetPoints: setPointsAction,
    dispatchAddPoint: addPointAction,
    dispatchChangeRadius: changeRadiusAction
}

export default connect(mapStateToProps, mapDispatchToProps)(PointForm);
