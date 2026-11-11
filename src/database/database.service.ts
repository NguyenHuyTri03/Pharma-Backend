import {
    Injectable,
    OnModuleDestroy,
} from '@nestjs/common';

import {
    createPool,
    Pool,
} from 'mysql2/promise';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
    private pool: Pool;

    constructor(private configService: ConfigService) {
        this.pool = createPool({
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            waitForConnections: true,
            connectionLimit: 10,
        });
    }

    async query(sql: string, params: any[] = []) {
        const [results] = await this.pool.execute(sql, params);
        return results;
    }

    async onModuleDestroy() {
        await this.pool.end();
    }
}