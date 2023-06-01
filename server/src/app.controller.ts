import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    return this.appService.createLink(body)
  }
}
