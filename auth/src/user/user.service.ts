import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: Record<string, any>): Promise<User> {
    // Verificar se o usuário já existe (por exemplo, pelo e-mail)
    const existingUser = await this.userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Criar um novo usuário com os dados fornecidos
    return this.userRepository.createUser(userData);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateData: Record<string, any>): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Atualizar os campos fornecidos no objeto updateData
    Object.assign(user, updateData);

    // Salvar as alterações no banco de dados
    return user.save();
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remover o usuário do banco de dados
    await this.userRepository.deleteUser(id);
  }

  // Outros métodos de serviço relacionados a usuários podem ser adicionados aqui
}
