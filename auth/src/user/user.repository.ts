import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userData: Record<string, any>): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUser(id: string, updateData: Record<string, any>): Promise<User | null> {
    const user = await this.findUserById(id);
    if (!user) {
      return null;
    }

    // Atualizar os campos fornecidos em updateData
    Object.assign(user, updateData);

    // Salvar as alterações no banco de dados
    return user.save();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id).exec();
  }
}
