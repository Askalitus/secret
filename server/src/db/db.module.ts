import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: process.env.DB_USER,
    host: 'postgres',
    database: 'secret',
    password: '1234',
    port: 5432,
  }),
};

@Module({
  imports: [],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
