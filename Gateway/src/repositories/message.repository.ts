import { MesssageEntity } from 'src/entities/message.entity'
import { Repository } from 'typeorm'

export class MessageRepository extends Repository<MesssageEntity> {}
