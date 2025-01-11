import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './schema/user.model';
import { UpdateUserDTO } from './dto/user.dto';


@Injectable()
export class UserService {
  /**
   * Constructor for UserService.
   * @param userRepository - The TypeORM repository for the User entity.
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of User entities.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the User entity or null if not found.
   */
  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Updates a user by their ID.
   * @param id - The ID of the user to update.
   * @param update - The data to update the user with.
   * @returns A promise that resolves to the updated User entity or null if not found.
   */
  async update(id: number, update: UpdateUserDTO): Promise<User | null> {
    await this.userRepository.update(id, update);
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Removes a user by their ID.
   * @param id - The ID of the user to remove.
   * @returns A promise that resolves to the removed User entity or null if not found.
   */
  async remove(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      await this.userRepository.remove(user);
    }
    return user;
  }
}
