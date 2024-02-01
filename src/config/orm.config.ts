import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: (process.env.NODE_ENV === 'development') || false,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`]
};

export default new DataSource(typeOrmConfig);
