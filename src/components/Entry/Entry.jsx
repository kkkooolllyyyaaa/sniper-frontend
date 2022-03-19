import React from 'react';

const Entry = (props) => {
    return (
        <tr>
            <td>
                {props.point.x}
            </td>
            <td>
                {props.point.y}
            </td>
            <td>
                {props.point.radius}
            </td>
            <td>
                {props.point.result ? 'true' : 'false'}
            </td>
        </tr>
    );
}

export default Entry;
