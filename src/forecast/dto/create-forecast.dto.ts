import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartEnum } from '../enums/forecast-part.enum';

export class CreateForecastDto {
  @IsNumber()
  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsLongitude()
  @IsNotEmpty()
  lon: number;

  @IsString()
  @IsEnum(PartEnum)
  @IsOptional()
  part?: PartEnum = PartEnum.current;
}
