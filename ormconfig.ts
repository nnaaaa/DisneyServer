import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export const config = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345',
    database: 'disney',
    // dropSchema: true,
    migrationsRun: true,
    synchronize: false,
    // synchronize: true,
    entities: [__dirname + 'dist/src/entities/*{.entity.js}'],
    migrations: [__dirname + 'dist/src/migrations/*{.ts,.js}'],
    // cli: {
    //     migrationsDir: "src/migrations"
    // }
    // type: 'mssql',
    // host: 'localhost',
    // port: 1433,
    // username: 'sa',
    // password: 'sa',
    // database: 'db1',
    // synchronize: false,
})
