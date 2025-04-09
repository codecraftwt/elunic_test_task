import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string, items: number[] } {
    return { message: 'Hello API', items: [1, 2, 3] };
  }
}
