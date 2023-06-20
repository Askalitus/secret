import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import * as process from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetLink } from '../models/getLink.entity';
import { CreateLink } from '../models/createLink.entity';
import { LinkId } from '../models/linkId.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [GetLink, CreateLink, LinkId],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
