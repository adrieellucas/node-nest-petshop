import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING || 'mongodb://mongoadriel:euhru334@localhost:1500/admin'),
    BackofficeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
