import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ForecastService } from './forecast.service';
import { ForecastEntity } from './entities/forecast.entity';

const mockedConfigService = {
  get() {}
};

const mockedHttpService = {
  get() {}
};

describe('ForecastService', () => {
  let forecastService: ForecastService;
  let create: jest.Mock;
  let save: jest.Mock;
  let findOne: jest.Mock;
  let query: jest.Mock;

  beforeEach(async() => {
    create = jest.fn();
    save = jest.fn();
    findOne = jest.fn();
    query = jest.fn();

    const module = await Test.createTestingModule({
      providers: [
        ForecastService,
        {
          provide: ConfigService,
          useValue: mockedConfigService
        },
        {
          provide: HttpService,
          useValue: mockedHttpService
        },
        {
          provide: getRepositoryToken(ForecastEntity),
          useValue: {
            create,
            save,
            findOne,
            query
          }
        }
      ]
    }).compile();

    forecastService = await module.get(ForecastService);
  });

  it('ForecastService should be defined', () => {
    expect(forecastService).toBeDefined();
  });

  describe('createForecast tests', () => {
    it('should return ConflictException', async () => {
      jest.spyOn<any, any>(forecastService, 'getForecastByLatAndLon')
        .mockReturnValue(true);

      const createForecast = forecastService.createForecast({} as any);

      await expect(createForecast).rejects.toBeInstanceOf(
        ConflictException
      );
    });

    it('should be completed correctly', async () => {
      const params = { lat: 15, lon: 100 };

      jest.spyOn<any, any>(forecastService, 'getForecastByLatAndLon')
        .mockReturnValue(false);
      jest.spyOn<any, any>(forecastService, 'requestForecast')
        .mockReturnValue({ data: {} });

      await forecastService.createForecast(params);

      expect(forecastService['getForecastByLatAndLon']).toHaveBeenCalledTimes(1);
      expect(forecastService['getForecastByLatAndLon']).toHaveBeenCalledWith(params.lat, params.lon);
      expect(forecastService['requestForecast']).toHaveBeenCalledTimes(1);
      expect(forecastService['requestForecast']).toHaveBeenCalledWith(params.lat, params.lon);
    });
  });

  describe('getForecast tests', () => {
    it('should return NotFoundException', async () => {
      query.mockReturnValue([]);

      const getForecast = forecastService.getForecast({} as any);

      await expect(getForecast).rejects.toBeInstanceOf(
        NotFoundException
      );
    });

    it('should return correct result', async () => {
      const part = { value: 1 };
      query.mockReturnValue([{ part }]);

      const getForecastResult = await forecastService.getForecast({} as any);

      expect(getForecastResult).toEqual(part);
    });
  });
});
