import { Table, Column, Model } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class GetLink extends Model {
  @Column
  @ApiProperty({ description: 'Сообщение пользователя', nullable: false })
  message: string;

  @Column
  @ApiProperty({
    description: 'Количество оставшихся дней действия ссылки',
    nullable: false,
  })
  remainingDays: number;

  @Column
  @ApiProperty({
    description: 'Количество оставшихся просмотров ссылки',
    nullable: false,
  })
  remainingWatchings: number;

  @Column
  secret: string;
}
