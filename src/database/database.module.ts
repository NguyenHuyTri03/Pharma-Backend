import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from '../controllers/database/database.controller';

@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
    controllers: [DatabaseController],
})
export class DatabaseModule { }