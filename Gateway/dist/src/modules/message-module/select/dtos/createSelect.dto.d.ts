import { SelectStyle } from "src/entities/select.entity";
import { CreateOptionDto } from "./createOption.dto";
export declare class CreateSelectDto {
    customId?: string;
    style?: SelectStyle;
    isDisabled?: boolean;
    options: CreateOptionDto[];
}
