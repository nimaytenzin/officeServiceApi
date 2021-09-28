import { SECTION_REPOSITORY } from "src/core/constants";
import { Section } from "./section.entity";

export const SectionsProvider = [{
    provide: SECTION_REPOSITORY,
    useValue: Section,
}];