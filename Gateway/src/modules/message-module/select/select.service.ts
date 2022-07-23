import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionEntity } from 'src/entities/action.entity';
import { OptionEntity } from 'src/entities/option.entity';
import { SelectEntity } from 'src/entities/select.entity';
import { OptionRepository } from 'src/repositories/option.repository';
import { SelectRepository } from 'src/repositories/select.repository';
import { CreateSelectDto } from './dtos/createSelect.dto';

@Injectable()
export class SelectService {
    constructor(
        @InjectRepository(SelectEntity) private selectRepository: SelectRepository,
        @InjectRepository(OptionEntity) private optionRepository: OptionRepository,
    ) { }

    async save(select: SelectEntity) {
        return await this.selectRepository.save(select)
    }

    async create(createSelectDto: CreateSelectDto, action: ActionEntity) {
        const newSelect = this.selectRepository.create({
            ...createSelectDto,
            options:[],
            action,
        });

        const savedSelect = await this.save(newSelect);

        for (const option of createSelectDto.options) {
            const newOption = this.optionRepository.create({...option, select: savedSelect});
            savedSelect.options.push(newOption);
        }

        return this.save(savedSelect)
    }
}
