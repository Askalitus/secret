import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { GetLink } from '../models/getLink.entity';
import { CreateLink } from '../models/createLink.entity';
import { GetSecret } from '../models/getSecret.entity';

@Injectable()
export class AppService {
  constructor(private sequalize: Sequelize) {}

  /**
   *Получение ссылки
   * @param {string} id - идентификатор ссылки
   */
  async getLink(id: string): Promise<GetLink | string> {
    const secret = await this.sequalize.query(
      `
          SELECT secret
          FROM links
          WHERE id = $1 AND watchingAll > watchingNow AND willDeleteAt > CURRENT_TIMESTAMP
        `,
      {
        type: QueryTypes.SELECT,
        model: GetSecret,
        mapToModel: true,
        bind: [id],
      },
    );

    return this.sequalize
      .query(
        `
            SELECT message,
                   CAST(EXTRACT(DAY FROM willDeleteAt - CURRENT_TIMESTAMP) AS int) + 1 AS remainingDays,
                   (watchingAll - watchingNow) AS remainingWatchings
            FROM links
            WHERE id = $1
              AND watchingAll > watchingNow
              AND willDeleteAt > CURRENT_TIMESTAMP
            `,
        {
          type: QueryTypes.SELECT,
          model: GetLink,
          mapToModel: true,
          bind: [id],
        },
      )
      .then((link): GetLink | string => {
        if (!link[0]) {
          return 'Ссылка была удалена или её не существует!';
        }
        link[0].message = CryptoJS.AES.decrypt(
          link[0].message,
          secret[0].secret,
        ).toString(CryptoJS.enc.Utf8);
        return link[0];
      });
  }

  /**
   * Создание ссылки
   * @param {object} body - объект с данными ссылки
   */
  createLink(body: CreateLink): string {
    const id: string = crypto.randomUUID().split('-').join('');

    const secretKey: string = crypto.randomUUID().split('-').join('');

    const message: string = CryptoJS.AES.encrypt(
      body.message,
      secretKey,
    ).toString();

    const willDeleteAt: string = moment(
      new Date(new Date().getTime() + body.days * 86400000),
    ).format();

    this.sequalize.query(
      `INSERT INTO links
        VALUES ($1, $2, $3, $4, 0, $5)`,
      {
        bind: [id, message, willDeleteAt, body.watchingAll, secretKey],
      },
    );

    return id;
  }

  /**
   * Повышение текущих просмотров ссылки
   * @param {string} id - идентификатор ссылки
   */
  lowWatching(id: string): void {
    this.sequalize.query(
      `UPDATE links
       SET watchingNow = watchingNow + 1
       WHERE id = $1`,
      {
        bind: [id],
      },
    );
  }
}
