import { DESIGNATION_REPOSITORY } from "src/core/constants";
import { Designation } from "./designation.entity";

export const DesignationsProvider = [{
    provide: DESIGNATION_REPOSITORY,
    useValue: Designation,
}];