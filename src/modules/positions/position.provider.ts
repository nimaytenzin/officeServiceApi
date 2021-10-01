import { POSITION_REPOSITORY } from "src/core/constants";
import { Position } from "./position.entity";

export const PositionsProvider = [{
    provide: POSITION_REPOSITORY,
    useValue: Position,
}];