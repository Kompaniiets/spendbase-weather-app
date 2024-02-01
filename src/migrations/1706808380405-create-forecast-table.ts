import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateForecastTable1706808380405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "forecasts" (
            "id" SERIAL PRIMARY KEY,

            "lat" FLOAT NOT NULL,
            "lon" FLOAT NOT NULL,
            "metadata" jsonb,

            "createdAt" timestamp DEFAULT timezone('UTC', now()) NOT NULL,
            "updatedAt" timestamp DEFAULT timezone('UTC', now()) NOT NULL
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('forecasts');
  }
}
