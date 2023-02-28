import { Cell } from "../state";
import  CodeCell from '../components/code-cell';
import TextEditor from '../components/text-editor';
import ActionBar from './action-bar';
import './cell-item-list.css'
// import { useDispatch } from 'react-redux';
// import { actionCreators } from '../state';

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
    // const dispatch = useDispatch();
    // dispatch(actionCreators.updateCell('askeed', 'askeed'))
    let child: JSX.Element;
    if (cell.type === 'code') {
        child = <>
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id} />
            </div>
            <CodeCell cell={cell}/>
        </>
    } else {
        child = <>
            {/* <ActionBar id={cell.id} /> */}
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id} />
            </div>
            <TextEditor cell={cell} />
        </>
    }
    return (
        <div className="cell-list-item">
            {child}
        </div>
    ) 
}

export default CellListItem;