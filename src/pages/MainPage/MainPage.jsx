import React, {useEffect} from 'react'

import PointForm from "../../components/PointForm/PointForm";
import Graph from "../../components/Graph/Graph";
import PointTable from "../../components/PointTable/PointTable";

const TITLE = "Main"
const MainPage = (props) => {
    useEffect(() => {
        document.title = TITLE
    }, []);

    return (
        <div>
            <PointForm/>
            <Graph/>
            <PointTable/>
        </div>
    )
};

export default MainPage;
