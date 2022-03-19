import React, {useRef} from "react";
import {connect} from "react-redux";

import {Toast} from "primereact/toast";

import {addPointAction} from "../../store/action/actionCreator";
import pointsAPI from "../../api/pointsAPI";
import EntryDot from "../Entry/EntryDot";
import styles from './Graph.module.css';


export const SVG_RADIUS = 150;
export const SVG_SHIFT = 25;
const SVG_AXIS = SVG_RADIUS + SVG_SHIFT;
const SVG_WIDTH = SVG_RADIUS * 2 + SVG_SHIFT * 2;
const SVG_HEIGHT = SVG_RADIUS * 2 + SVG_SHIFT * 2;
const SVG_AXIS_WIDTH = 5;
const SVG_MARKER_SHIFT = 5;


const Graph = (props) => {
    const toast = useRef(null);

    const showPointsError = (message) => {
        toast.current.show({
            severity: 'error',
            summary: 'Validation',
            detail: message,
            life: 3000
        });
    };

    const showUnexpectedAnswerError = () => {
        toast.current.show({severity: 'error', summary: 'Error', detail: 'Unexpected error from server', life: 3000});
    };
    const showServerShutDownError = () => {
        toast.current.show({severity: 'error', summary: 'Server', detail: 'Server is unavailable', life: 3000});
    }

    const SVGtoX = (xCor, rVal) => Math.floor(((xCor - (SVG_RADIUS + SVG_SHIFT)) / SVG_RADIUS * rVal) * 100) / 100;
    const SVGtoY = (yCor, rVal) => -Math.floor(((yCor - (SVG_RADIUS + SVG_SHIFT)) / SVG_RADIUS * rVal) * 100) / 100;
    const getSVG = () => document.getElementById('area-graph');

    const getFromSVG = (rVal, event) => {
        const svgArea = getSVG();
        const rect = svgArea.getBoundingClientRect();
        const yCor = (event.clientY - rect.top);
        const xCor = (event.clientX - rect.left);
        const xVal = SVGtoX(xCor, rVal);
        const yVal = SVGtoY(yCor, rVal);
        return {
            xVal: xVal,
            yVal: yVal
        };
    };

    const processOnClick = (event) => {
        const rVal = props.radius;
        const coordinates = getFromSVG(rVal, event);
        const xVal = coordinates.xVal;
        const yVal = coordinates.yVal;
        pointsAPI.check(xVal, yVal, rVal).then(response => {
            if (response.status === 200) {
                props.dispatchAddPoint(response.data);
            } else {
                showUnexpectedAnswerError();
            }
        }).catch(e => {
            if (e.message === 'Network Error')
                showServerShutDownError();
            else
                showPointsError(JSON.stringify(e.response.data.message));
        });
    };

    return (
        <div className="GraphSection">
            <Toast ref={toast}/>
            <svg className={styles.svgCoordinates} height={SVG_HEIGHT} width={SVG_WIDTH}
                 xmlns="http://www.w3.org/2000/svg"
                 id="area-graph" onClick={event => processOnClick(event)}>
                <rect className={styles.coordinatesFigure} x={SVG_AXIS} y={SVG_AXIS}
                      width={SVG_RADIUS / 2} height={SVG_RADIUS}/>

                <polygon className={styles.coordinatesFigureHelper} points="175 325 25 175 175 175 "/>
                <path className={styles.coordinatesFigure} d="M 25, 175 Q50 325 175 325"/>


                <polygon className={styles.coordinatesFigure} points="100,175 175,100 175,175 "/>

                <line className={styles.coordinateAxis} x1={0} x2={2 * SVG_AXIS} y1={SVG_AXIS} y2={SVG_AXIS}/>
                <line className={styles.coordinateAxis} x1={SVG_AXIS} x2={SVG_AXIS} y1={2 * SVG_AXIS}
                      y2={SVG_AXIS_WIDTH}/>

                <polygon className={styles.coordinateAxis} points="350,175 335,170 335,180"/>
                <polygon className={styles.coordinateAxis} points="175,0 180,15 170,15"/>

                <text className={styles.coordinatesText} x="182" y="11">y</text>
                <text className={styles.coordinatesText} x="335" y="195">x</text>

                <line className={styles.coordinatesMarker}
                      x1={SVG_AXIS - SVG_MARKER_SHIFT} x2={SVG_AXIS + SVG_MARKER_SHIFT}
                      y1={SVG_SHIFT} y2={SVG_SHIFT}/>
                <line className={styles.coordinatesMarker}
                      x1={SVG_AXIS - SVG_MARKER_SHIFT} x2={SVG_AXIS + SVG_MARKER_SHIFT}
                      y1={SVG_SHIFT + SVG_RADIUS / 2} y2={SVG_SHIFT + SVG_RADIUS / 2}/>
                <line className={styles.coordinatesMarker}
                      x1={SVG_AXIS - SVG_MARKER_SHIFT} x2={SVG_AXIS + SVG_MARKER_SHIFT}
                      y1={SVG_SHIFT + 3 / 2 * SVG_RADIUS} y2={SVG_SHIFT + 3 / 2 * SVG_RADIUS}/>
                <line className={styles.coordinatesMarker}
                      x1={SVG_AXIS - SVG_MARKER_SHIFT} x2={SVG_AXIS + SVG_MARKER_SHIFT}
                      y1={SVG_SHIFT + 2 * SVG_RADIUS} y2={SVG_SHIFT + 2 * SVG_RADIUS}/>

                <line className={styles.coordinatesMarker}
                      x1={SVG_SHIFT} x2={SVG_SHIFT}
                      y1={SVG_AXIS - SVG_MARKER_SHIFT} y2={SVG_AXIS + SVG_MARKER_SHIFT}/>
                <line className={styles.coordinatesMarker}
                      x1={SVG_SHIFT + SVG_RADIUS / 2} x2={SVG_SHIFT + SVG_RADIUS / 2}
                      y1={SVG_AXIS - SVG_MARKER_SHIFT} y2={SVG_AXIS + SVG_MARKER_SHIFT}/>
                <line className={styles.coordinatesMarker}
                      x1={SVG_SHIFT + 3 / 2 * SVG_RADIUS} x2={SVG_SHIFT + 3 / 2 * SVG_RADIUS}
                      y1={SVG_AXIS - SVG_MARKER_SHIFT} y2={SVG_AXIS + SVG_MARKER_SHIFT}/>
                <line className={styles.coordinatesMarker}
                      x1={SVG_SHIFT + 2 * SVG_RADIUS} x2={SVG_SHIFT + 2 * SVG_RADIUS}
                      y1={SVG_AXIS - SVG_MARKER_SHIFT} y2={SVG_AXIS + SVG_MARKER_SHIFT}/>

                <text className={styles.coordinatesText} id="Ry" x="180" y="40">{props.radius}</text>
                <text className={styles.coordinatesText} id="-Ry" x="180" y="340">-{props.radius}</text>
                <text className={styles.coordinatesText} id="-Rx" x="20" y="165">-{props.radius}</text>
                <text className={styles.coordinatesText} id="Rx" x="320" y="165">{props.radius}</text>
                {props.points.map(pnt => <EntryDot point={pnt} rad={props.radius} key={pnt.id}/>)}
            </svg>
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
    dispatchAddPoint: addPointAction
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph);
