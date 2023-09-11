import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./auth.module";
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true, envFilePath:['../.env']}),
    MongooseModule.forRoot('mongodb://auth_service_db/trantorauthdb'),
    AuthModule,
    UserModule,
  ],
})
export class AppModule { }