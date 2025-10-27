import { Repository } from 'typeorm';
import { dataSource } from '../../config/typeorm';
import { buildPagination, PaginationQuery, toPaginatedResponse } from '../../utils/pagination';
import { Message } from './message.entity';
import { MessageInput } from './message.dto';

class MessageService {
  private get repository(): Repository<Message> {
    if (!dataSource.isInitialized) {
      throw new Error('Data source is not initialised yet');
    }
    return dataSource.getRepository(Message);
  }

  async create(senderId: string, payload: MessageInput) {
    const message = this.repository.create({
      senderId,
      recipientId: payload.recipientId,
      content: payload.content,
      type: payload.type
    });
    return this.repository.save(message);
  }

  async list(userId: string, pagination: PaginationQuery) {
    const { skip, take, page, pageSize } = buildPagination(pagination);
    const [data, total] = await this.repository.findAndCount({
      where: [{ senderId: userId }, { recipientId: userId }],
      skip,
      take
    });
    return toPaginatedResponse(data, total, page, pageSize);
  }
}

export const messageService = new MessageService();
