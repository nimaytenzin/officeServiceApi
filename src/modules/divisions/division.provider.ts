import { DIVISION_REPOSITORY } from "src/core/constants";
import { Division } from "./division.entity";

export const DivisionsProvider = [{
    provide: DIVISION_REPOSITORY,
    useValue: Division,
}];