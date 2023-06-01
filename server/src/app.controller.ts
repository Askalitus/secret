import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLinks(){
    return this.appService.getLinks();
  }

  @Get('link')
  getLink(@Body() body: any){
    return this.appService.getLink(body);
  }

  @Post()
  createLink(@Body() body: any){
    console.log(body)
    return this.appService.createLink(body)
  }
}
