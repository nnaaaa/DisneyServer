import { ActionEntity } from 'src/entities/action.entity';
import { SelectEntity } from 'src/entities/select.entity';
import { OptionRepository } from 'src/repositories/option.repository';
import { SelectRepository } from 'src/repositories/select.repository';
import { CreateSelectDto } from './dtos/createSelect.dto';
export declare class SelectService {
    private selectRepository;
    private optionRepository;
    constructor(selectRepository: SelectRepository, optionRepository: OptionRepository);
    save(select: SelectEntity): Promise<SelectEntity>;
    create(createSelectDto: CreateSelectDto, action: ActionEntity): Promise<SelectEntity>;
}