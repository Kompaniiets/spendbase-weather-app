import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';
import { ForecastEntity } from './entities/forecast.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ForecastEntity])
  ],
  controllers: [ForecastController],
  providers: [ForecastService]
})
export class ForecastModule {
}
