import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from './constants';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  async getLinks(): Promise<any> {
    const res = await this.conn.query('SELECT * FROM links');
    return res.rows;
  }

  async getLink(id: string): Promise<any> {
    const res = await this.conn.query(`SELECT * FROM links WHERE id = '${id}'`);
    return res.rows;
  }

  createLink(body: any): void {
    this.conn.query(
      `INSERT INTO links VALUES ('${body.id}', '${body.message}', ${body.days}, ${body.watching}, '${body.createdIn}')`,
    );
  }

  lowWatching(id: string, body: any): void {
    this.conn.query(
      `UPDATE links SET watching = ${body.watching} WHERE id = '${id}'`,
    );
  }
}
