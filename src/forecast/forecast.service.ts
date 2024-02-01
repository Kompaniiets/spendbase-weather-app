import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { ForecastEntity } from './entities/forecast.entity';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { PartProperties, WeatherProperties } from './interfaces/forecast.interface';
import { GetForecastDto } from './dto/get-forecast.dto';

@Injectable()
export class ForecastService {
  private openweatherUrl: string;
  private openweatherApiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectRepository(ForecastEntity)
    private forecastRepository: Repository<ForecastEntity>
  ) {
    this.openweatherUrl = this.configService.get('openweather.url');
    this.openweatherApiKey = this.configService.get('openweather.apiKey');
  }

  async createForecast(createForecastDto: CreateForecastDto): Promise<void> {
    const { lat, lon } = createForecastDto;
    const isForecastExist = await this.getForecastByLatAndLon(lat, lon);

    if(!!isForecastExist) {
      throw new ConflictException('Forecast already exist');
    }

    const forecastMetadata = await this.requestForecast(lat, lon);

    const createdForecast = await this.forecastRepository.create({
      lat,
      lon,
      metadata: forecastMetadata
    });

    await this.forecastRepository.save(createdForecast);
  }

  async getForecast(getForecastDto: GetForecastDto): Promise<PartProperties> {
    const { lat, lon, part } = getForecastDto;
    const [data] = await this.forecastRepository
      .query(
        `SELECT metadata->'${part}' as part from forecasts WHERE lat = $1 AND lon = $2 LIMIT 1`,
        [lat, lon]
      );

    if(!data) {
      throw new NotFoundException('Forecast not found');
    }

    if(Array.isArray(data.part)) {
      return data.part[0];
    }

    return data.part;
  }


  private async getForecastByLatAndLon(
    lat: number,
    lon: number
  ): Promise<ForecastEntity | null> {
    return this.forecastRepository.findOne({
      where: { lat, lon }
    });
  }

  private async requestForecast(lat: number, lon: number): Promise<WeatherProperties> {
    const { data } = await firstValueFrom(
      this.httpService.get<WeatherProperties>(this.openweatherUrl, {
        params: {
          lat,
          lon,
          appid: this.openweatherApiKey
        }
      }).pipe(
        catchError((error: AxiosError) => {
          throw `Openweather error: ${error?.response?.data}`;
        })
      )
    );

    return data;
  }
}
