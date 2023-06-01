import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from "./constants";

@Injectable()
export class AppService { 
  constructor(@Inject(PG_CONNECTION) private conn: any) {}
    
  async getLinks() { 
    const res = await this.conn.query('SELECT * FROM links');
    return res.rows;
  }

  async getLink(body: any) { 
    const res = await this.conn.query(`SELECT * FROM links WHERE id = '${body.id}'`);
    return res.rows;
  }

  createLink(body: any){
    this.conn.query(`INSERT INTO links VALUES ('${body.id}', '${body.message}', ${body.days}, ${body.watching})`)
  }


} 
