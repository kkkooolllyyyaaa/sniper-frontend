import {SVG_RADIUS, SVG_SHIFT} from "../Graph/Graph";

const inAreaColor = 'green';
const outAreaColor = 'red';
const circleRadius = 2.5;

const EntryDot = (props) => {
    const xToSVG = (x, r) => x / r * SVG_RADIUS + (SVG_RADIUS + SVG_SHIFT);
    const yToSVG = (y, r) => -y / r * SVG_RADIUS + (SVG_RADIUS + SVG_SHIFT);
    const getColor = (res) => res ? inAreaColor : outAreaColor;

    if (typeof (props.rad) !== 'undefined') {
        const cxAttr = xToSVG(props.point.x, props.rad);
        const cyAttr = yToSVG(props.point.y, props.rad);
        const clr = getColor(props.point.result);
        return (
            <circle cx={cxAttr} cy={cyAttr} stroke={clr} fill={clr} r={circleRadius}/>
        );
    } else {
        return '';
    }
}

export default EntryDot;
