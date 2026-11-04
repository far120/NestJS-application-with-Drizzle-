import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider.js'

@Module({
  providers: [databaseProvider],
  exports: [databaseProvider.provide],
})
export class DatabaseModule {}