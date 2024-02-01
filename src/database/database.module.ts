import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export default TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.database'),
      logging: (configService.get('environment') === 'development') || false,
      synchronize: false,
      migrationsRun: true,
      migrationsTableName: 'migrations',
      migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`]
    };
  },
  inject: [ConfigService]
});
