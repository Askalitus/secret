import { Table, Column, Model } from 'sequelize-typescript';
import { Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class CreateLink extends Model {
  @Column
  @ApiProperty({ description: 'Сообщение пользователя', nullable: false })
  message: string;

  @Column
  @ApiProperty({
    description: 'Количество дней действия ссылки',
    nullable: false,
  })
  @Min(1, { message: 'Количество дней должно быть больше одного!' })
  days: number;

  @Column
  @ApiProperty({
    description: 'Количество просмотров ссылки',
    nullable: false,
  })
  @Min(1, { message: 'Количество просмтров должно быть больше одного!' })
  watchingAll: number;
}
