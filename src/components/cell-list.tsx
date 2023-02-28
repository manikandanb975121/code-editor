import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";
import './cell-list.css'

const CellList: React.FC = () => {

    // useTypedSelector((state) => state.cells?.order.map((id) => state.cells?.data[id]));
    const cells = useTypedSelector(({cells}) => cells?.order.map((id) => cells.data[id]));

    const renderedCells = cells?.map(cell => 
        <Fragment key={cell.id} >
            {/* <AddCell nextCellId={cell.id} /> */}
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
        </Fragment>
    )
    return (
        <div className="cell-list">
            <AddCell forceVisible={cells?.length === 0} previousCellId={null} />
            {renderedCells}
            {/* <div className={cells?.length === 0 ? 'force-visible' : ''}> */}
                {/* <AddCell forceVisible={cells?.length === 0} nextCellId={null} /> */}
            {/* </div> */}
        </div>
    )
}

export default CellList;