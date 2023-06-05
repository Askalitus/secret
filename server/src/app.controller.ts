import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

// todo swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLinks(): Promise<any> {
    return this.appService.getLinks();
  }

  @Get(':id')
  getLink(@Param('id') id: string): Promise<any> {
    return this.appService.getLink(id);
  }

  // todo типизация
  @Post()
  createLink(@Body() body: any): void {
    this.appService.createLink(body);
  }

  @Put(':id')
  lowWatching(@Param('id') id: string, @Body() body: any): void {
    this.appService.lowWatching(id, body);
  }
}
