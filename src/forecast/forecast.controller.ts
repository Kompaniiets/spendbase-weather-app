import { Controller, Body, Post, Get, Query, UseInterceptors } from '@nestjs/common';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { ForecastService } from './forecast.service';
import { GetForecastDto } from './dto/get-forecast.dto';
import { ForecastResponseInterceptor } from '../utils/forecast-response.interceptor';

@Controller('forecast')
@UseInterceptors(ForecastResponseInterceptor)
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {
  }

  @Post()
  async create(@Body() createForecastDto: CreateForecastDto): Promise<void> {
    await this.forecastService.createForecast(createForecastDto);
  }

  @Get()
  async getForecast(@Query() getForecastDto: GetForecastDto): Promise<any> {
    return this.forecastService.getForecast(getForecastDto);
  }
}
