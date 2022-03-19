import React from 'react';
import {connect} from "react-redux";

import Entry from "../Entry/Entry";
import styles from './PointTable.module.css'

const PointTable = (props) => {
    return (
        <div className={styles.result}>
            <table className={styles.resultTable}>
                <thead>
                <tr>
                    <td>
                        X value
                    </td>
                    <td>
                        Y value
                    </td>
                    <td>
                        R value
                    </td>
                    <td>
                        Result
                    </td>
                </tr>
                </thead>
                <tbody>
                {props.points.map(pnt => <Entry point={pnt} key={pnt.id}/>)}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        points: state.points.points
    };
}

export default connect(mapStateToProps)(PointTable);