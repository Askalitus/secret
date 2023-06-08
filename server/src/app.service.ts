import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { GetLink } from '../models/getLink.entity';
import { CreateLink } from '../models/createLink.entity';

@Injectable()
export class AppService {
  constructor(private sequalize: Sequelize) {}

  /**
   *Получение ссылки
   * @param {string} id - идентификатор ссылки
   */
  async getLink(id: string): Promise<GetLink[]> {
    return await this.sequalize.query(
      `SELECT message, willDeleteAt, watchingAll, watchingNow FROM links WHERE id = $1 AND watchingAll > watchingNow AND willDeleteAt > CURRENT_TIMESTAMP`,
      {
        type: QueryTypes.SELECT,
        model: GetLink,
        mapToModel: true,
        bind: [id],
      },
    );
  }

  /**
   * Создание ссылки
   * @param {object} body - объект с данными ссылки
   */
  createLink(body: CreateLink): void {
    this.sequalize.query(`INSERT INTO links VALUES ($1, $2, $3, $4, 0)`, {
      bind: [body.id, body.message, body.willDeleteAt, body.watchingAll],
    });
  }

  /**
   * Повышение текущих просмотров ссылки
   * @param {string} id - идентификатор ссылки
   */
  lowWatching(id: string): void {
    this.sequalize.query(
      `UPDATE links SET watchingNow = watchingNow + 1 WHERE id = $1`,
      {
        bind: [id],
      },
    );
  }
}
