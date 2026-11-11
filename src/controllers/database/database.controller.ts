import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './../../database/database.service';

@Controller('database')
export class DatabaseController {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }

    @Get('test')
    async testConnection() {
        const result = await this.databaseService.query(
            'SELECT NOW() AS server_time',
        );

        return {
            message: 'MySQL connected successfully!',
            result,
        };
    }
}