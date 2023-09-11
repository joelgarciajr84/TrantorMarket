import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.model';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Importa o modelo de usuário e associa ao Mongoose
  ],
  controllers: [UserController], // Lista de controladores relacionados a usuários
  providers: [UserService, UserRepository], // Lista de serviços relacionados a usuários
  exports: [UserService], // Exporta o serviço de usuário para outros módulos (se necessário)
})
export class UserModule {}
