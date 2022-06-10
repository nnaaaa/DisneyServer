import { MysqlConnectionOptions } from './node_modules/typeorm/driver/mysql/MysqlConnectionOptions.d'

export const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345',
  database: 'disney',
  dropSchema: true,
  synchronize: true,
  // entities: ['src/**/*{.entity.ts}'],
  // migrations: ['src/migration/*{.ts,.js}'],
  // type: 'mssql',
  // host: 'localhost',
  // port: 1433,
  // username: 'sa',
  // password: 'sa',
  // database: 'db1',
  // synchronize: false,
}
