import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('create')
  async createMessage(@Body('text') text: string) {
    return this.messagesService.createMessage(text);
  }

  @Get()
  async getMessages(@Query('page') page: number, @Query('limit') limit: number) {
    return this.messagesService.getMessages(page,limit);
  }
}
