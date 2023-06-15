import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class GetSecret extends Model {
  @Column
  secret: string;
}
