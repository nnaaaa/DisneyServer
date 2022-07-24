import { IsNotEmpty, IsString } from "class-validator";
import { CreateOptionDto } from "./createOption.dto";

export class UpdateOptionDto extends CreateOptionDto{
    @IsNotEmpty()
    @IsString()
    optionId: string
}