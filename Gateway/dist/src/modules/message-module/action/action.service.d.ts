import { ActionEntity } from 'src/entities/action.entity';
import { ActionRepository } from 'src/repositories/action.repository';
import { DeepPartial, FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { ButtonService } from '../button/button.service';
import { ReactService } from '../react/react.service';
export declare class ActionService {
    private actionRepository;
    private reactService;
    private buttonService;
    readonly actionRelations: FindOptionsRelations<ActionEntity>;
    constructor(actionRepository: ActionRepository, reactService: ReactService, buttonService: ButtonService);
    save(action: ActionEntity): Promise<ActionEntity>;
    create(action: DeepPartial<ActionEntity>): Promise<ActionEntity>;
    findOneWithRelation(findCondition: FindOptionsWhere<ActionEntity>): Promise<ActionEntity>;
    findManyWithRelation(findCondition: FindOptionsWhere<ActionEntity>): Promise<ActionEntity[]>;
    findMany(findCondition: FindOptionsWhere<ActionEntity>): Promise<ActionEntity[]>;
    updateOne(updateActionDto: DeepPartial<ActionEntity>): Promise<ActionEntity>;
    deleteOne(findCondition: FindOptionsWhere<ActionEntity>): Promise<ActionEntity>;
    deleteMany(findCondition: FindOptionsWhere<ActionEntity>): Promise<void>;
}
