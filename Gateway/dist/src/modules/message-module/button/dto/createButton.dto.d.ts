import { ButtonStyle } from 'src/entities/button.entity';
export declare class CreateButtonDto {
    customId?: string;
    name: string;
    style?: ButtonStyle;
    isDisabled: boolean;
}
