import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class LinkId extends Model {
  @PrimaryKey
  @Column
  @ApiProperty({ description: 'Идентификатор ссылки', nullable: false })
  id: string;
}
