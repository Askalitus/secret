import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetLink } from '../models/getLink.entity';
import { CreateLink } from '../models/createLink.entity';

@ApiTags('links')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Получение данных ссылки по идентификатору' })
  @ApiParam({ name: 'id', required: true, description: 'Идентификатор ссылки' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: GetLink })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  getLink(@Param('id') id: string): Promise<GetLink | string> {
    return this.appService.getLink(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание ссылки' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: 'Идентификатор ссылки',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  createLink(@Body() body: CreateLink): string {
    return this.appService.createLink(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Понижение количества просмотров на ссылке' })
  @ApiParam({ name: 'id', required: true, description: 'Идентификатор ссылки' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  lowWatching(@Param('id') id: string): void {
    this.appService.lowWatching(id);
  }
}
