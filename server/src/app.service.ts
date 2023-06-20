import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { GetLink } from '../models/getLink.entity';
import { CreateLink } from '../models/createLink.entity';
import { LinkId } from '../models/linkId.entity';

@Injectable()
export class AppService {
  constructor(private sequalize: Sequelize) {}

  /**
   *Получение ссылки
   * @param {string} id - идентификатор ссылки
   */
  async getLink(id: string): Promise<GetLink> {
    return this.sequalize
      .query(
        `
            SELECT message, secret,
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
          bind: [id],
        },
      )
      .then((links): GetLink => {
        const [link] = links;
        if (!link) {
          throw new HttpException(
            'Ссылка была удалена или её не существует!',
            HttpStatus.NOT_FOUND,
          );
        }
        link.message = CryptoJS.AES.decrypt(link.message, link.secret).toString(
          CryptoJS.enc.Utf8,
        );
        delete link.dataValues.secret;
        return link;
      });
  }

  /**
   * Создание ссылки
   * @param {object} body - объект с данными ссылки
   */
  createLink(body: CreateLink): LinkId {
    const id = new LinkId();

    id.id = crypto.randomUUID().split('-').join('');

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
        bind: [id.id, message, willDeleteAt, body.watchingAll, secretKey],
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
