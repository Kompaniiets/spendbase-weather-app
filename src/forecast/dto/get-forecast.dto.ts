import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartEnum } from '../enums/forecast-part.enum';
import { Type } from 'class-transformer';

export class GetForecastDto {
  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  @Type(() => Number)
  lat: number;

  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  @Type(() => Number)
  lon: number;

  @IsString()
  @IsEnum(PartEnum)
  @IsOptional()
  part?: PartEnum = PartEnum.current;
}
