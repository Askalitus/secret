import {Body, Controller, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLinks(){
    return this.appService.getLinks();
  }

  @Get(':id')
  getLink(@Param('id') id: string){
    return this.appService.getLink(id);
  }

  @Post()
  createLink(@Body() body: any){
    return this.appService.createLink(body);
  }

  @Put(':id')
  lowWatching(@Param('id') id: string, @Body() body: any){
    return this.appService.lowWatching(id, body);
  }
}
