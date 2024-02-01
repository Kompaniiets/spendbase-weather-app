export interface TempProperties {
  day: number,
  min: number,
  max: number,
  night: number,
  eve: number,
  morn: number
}

export interface FeelsLikeProperties {
  day: number,
  night: number,
  eve: number,
  morn: number
}

export interface PartProperties {
  sunrise?: number,
  sunset?: number,
  temp?: number | TempProperties,
  feels_like?: number | FeelsLikeProperties,
  pressure?: number,
  humidity?: number,
  uvi?: number,
  wind_speed?: number
}

export interface WeatherProperties {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: PartProperties,
  minutely: [PartProperties],
  hourly: [PartProperties],
  daily: [PartProperties]
}

export interface ForecastResponse {
  sunrise: number,
  sunset: number,
  temp: number,
  feels_like: number,
  pressure: number,
  humidity: number,
  uvi: number,
  wind_speed: number,
}
