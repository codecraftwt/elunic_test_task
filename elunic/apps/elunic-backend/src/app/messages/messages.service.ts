import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async createMessage(text: string): Promise<Message> {
    const message = this.messagesRepository.create({ text });
    return this.messagesRepository.save(message);
  }

  async getMessages(page = 1, limit = 3): Promise<Message[]> {

    page = Math.max(1, Number(page)) || 1;
    limit = Math.min(Math.max(1, Number(limit)), 100) || 3;
    
    return this.messagesRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });
  }
}
