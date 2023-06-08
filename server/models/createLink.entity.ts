import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class CreateLink extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  message: string;

  @Column
  willDeleteAt: string;

  @Column
  watchingAll: number;
}
