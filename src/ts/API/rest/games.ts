import { IFigure } from "../../Figure/IFigure";
import { makeRequest } from "../makeRequest";

export const saveData = (figuresArray: IFigure[]) => {
    return makeRequest('/games', {
        method: 'POST',
        body: {
            title: "Chess",
            body: figuresArray,
        }
    })
}