import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForecastResponse } from '../forecast/interfaces/forecast.interface';

@Injectable()
export class ForecastResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ForecastResponse> {
    return next
      .handle()
      .pipe(map(data => ({
        sunrise: data?.sunrise,
        sunset: data?.sunset,
        temp: data?.temp,
        feels_like: data?.feels_like,
        pressure: data?.pressure,
        humidity: data?.humidity,
        uvi: data?.uvi,
        wind_speed: data?.wind_speed
      })));
  }
}
