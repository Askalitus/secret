import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/createLink.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { GetLinkDto } from './dto/getLink.dto';

// todo jsdoc
@Injectable()
export class AppService {
  constructor(private sequalize: Sequelize) {}

  async getLink(id: string): Promise<any> {
    return await this.sequalize.query(
      `SELECT message, willDeleteAt, watchingAll, watchingNow FROM links WHERE id = '${id}' AND watchingAll >= watchingNow AND willDeleteAt > CURRENT_TIMESTAMP`,
      {
        type: QueryTypes.SELECT,
        raw: false,
      },
    );
  }

  createLink(body: CreateLinkDto): void {
    // todo вставлять через параметры для экранирпования
    this.sequalize.query(
      `INSERT INTO links VALUES ('${body.id}', '${body.message}', '${body.willDeleteAt}', ${body.watchingAll}, 0)`,
    );
  }

  // todo добавить экранирование
  lowWatching(id: string): void {
    this.sequalize.query(
      `UPDATE links SET watchingNow = watchingNow + 1 WHERE id = '${id}'`,
    );
  }
}
