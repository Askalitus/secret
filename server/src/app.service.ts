import { Injectable, Inject } from '@nestjs/common';
// todo  seq https://sequelize.org/docs/v6/other-topics/migrations/,  описать миграции
import { PG_CONNECTION } from './constants';

// todo jsdoc
@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  // todo days -> заменить на дату, если дата меньше текущей, нечего не вернуть.
  // todo добавить поле, сколько раз уже посмотрели. Сравнить с полем при создании
  // todo метод не нужен
  async getLinks(): Promise<any> {
    // todo destruct
    // todo вернуть только то что надо
    const res = await this.conn.query('SELECT * FROM links');
    return res.rows;
  }

  async getLink(id: string): Promise<any> {
    const res = await this.conn.query(`SELECT * FROM links WHERE id = '${id}'`);
    return res.rows;
  }
   //

  // todo типизация
  createLink(body: any): void {
    // todo вставлять через параметры для экранирпования
    this.conn.query(
      `INSERT INTO links VALUES ('${body.id}', '${body.message}', ${body.days}, ${body.watching}, '${body.createdIn}')`,
    );
  }

  // todo добавить экранирование
  lowWatching(id: string, body: any): void {
    this.conn.query(
      `UPDATE links SET watching = ${body.watching} WHERE id = '${id}'`,
    );
  }
}
