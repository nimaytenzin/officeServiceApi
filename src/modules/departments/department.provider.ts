import { DEPARTMENT_REPOSITORY } from "src/core/constants";
import { Department } from "./department.entity";




export const DepartmentsProvider = [{
    provide: DEPARTMENT_REPOSITORY,
    useValue: Department,
}];