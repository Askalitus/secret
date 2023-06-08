import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class GetLink extends Model {
  @Column
  message: string;

  @Column
  willDeleteAt: string;

  @Column
  watchingAll: number;

  @Column
  watchingNow: number;
}
