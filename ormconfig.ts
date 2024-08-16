const ConnectonOptions = require('typeorm');
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export default new ConnectonOptions.DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [`dist/**/*.entity{.ts,.js}`],
  synchronize: false,
  // migrationsRun: false,
  // logging: false,
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/migrations',
  },
  migrationsTableName: 'migrations',
});
