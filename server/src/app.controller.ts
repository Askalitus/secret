import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateLinkDto } from './dto/createLink.dto';
import { GetLinkDto } from './dto/getLink.dto';

// todo swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getLink(@Param('id') id: string): Promise<GetLinkDto> {
    return this.appService.getLink(id);
  }

  @Post()
  createLink(@Body() body: CreateLinkDto): void {
    this.appService.createLink(body);
  }
  //
  // @Put(':id')
  // lowWatching(@Param('id') id: string): void {
  //   this.appService.lowWatching(id);
  // }
}
