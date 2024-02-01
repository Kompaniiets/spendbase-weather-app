import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { WeatherProperties } from '../interfaces/forecast.interface';

@Entity('forecasts')
export class ForecastEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  lat: number;

  @Column({ nullable: false })
  lon: number;

  @Column({
    type: 'jsonb'
  })
  metadata: WeatherProperties;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => `timezone('UTC'::text, now())`
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => `timezone('UTC'::text, now())`
  })
  updatedAt: Date;
}
