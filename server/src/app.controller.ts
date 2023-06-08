import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { GetLink } from '../models/getLink.entity';
import { CreateLink } from '../models/createLink.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getLink(@Param('id') id: string): Promise<GetLink[]> {
    return this.appService.getLink(id);
  }

  @Post()
  createLink(@Body() body: CreateLink): void {
    this.appService.createLink(body);
  }

  @Put(':id')
  lowWatching(@Param('id') id: string): void {
    this.appService.lowWatching(id);
  }
}
