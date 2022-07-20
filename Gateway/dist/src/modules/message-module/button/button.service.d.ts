import { ButtonEntity } from 'src/entities/Button.entity';
import { ButtonRepository } from 'src/repositories/Button.repository';
import { ActionDto } from 'src/shared/dtos/action.dto';
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { CreateButtonDto } from './dto/createButton.dto';
import { UpdateButtonDto } from './dto/updateButton.dto';
export declare class ButtonService {
    private buttonRepository;
    readonly buttonRelations: FindOptionsRelations<ButtonEntity>;
    constructor(buttonRepository: ButtonRepository);
    save(Button: ButtonEntity): Promise<ButtonEntity>;
    create(createButtonDto: CreateButtonDto, action: ActionDto): Promise<ButtonEntity>;
    findOne(findCondition: FindOptionsWhere<ButtonEntity>): Promise<ButtonEntity>;
    findOneWithRelation(findCondition: FindOptionsWhere<ButtonEntity>): Promise<ButtonEntity>;
    findMany(findCondition: FindOptionsWhere<ButtonEntity>): Promise<ButtonEntity[]>;
    updateOne(updateButtonDto: UpdateButtonDto): Promise<ButtonEntity>;
    deleteOne(findCondition: FindOptionsWhere<ButtonEntity>): Promise<ButtonEntity>;
    deleteMany(findCondition: FindOptionsWhere<ButtonEntity>): Promise<void>;
}
