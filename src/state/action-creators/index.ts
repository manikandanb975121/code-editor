import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action, UpdateCellAction, DeleteCellAction, MoveCellAction, InsertCellAfterAction, Direction } from "../actions";
import { CellTypes } from "../cell";
import bundler from "../../bundler";


export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
};

export const insertCellAfter = (id: string | null, cellType: CellTypes): InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type: cellType
        }
    }
}


export const createBundle = (cellId: string, input: string) => {
    console.log({cellId, input})
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BUNDLE_START,
            payload: {
                cellId
            }
        })

        const result = await bundler(input);

        dispatch({
            type: ActionType.BUNDLE_COMPLETE,
            payload: {
                cellId,
                bundle: result
            }
        })
    }
}