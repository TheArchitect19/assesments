import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.model';
import { Model } from 'mongoose';
import { UpdateUserDTO } from './dto/user.dto';

/**
 * Service responsible for user-related operations.
 */
@Injectable()
export class UserService {
  /**
   * Constructor for UserService.
   * @param userModel - The Mongoose model for the User entity.
   */
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of User entities.
   */
  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find();
    return users;
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the User entity or null if not found.
   */
  async findOne(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id);
    return user;
  }

  /**
   * Updates a user by their ID.
   * @param id - The ID of the user to update.
   * @param update - The data to update the user with.
   * @returns A promise that resolves to the updated User entity or null if not found.
   */
  async update(
    id: string,
    update: UpdateUserDTO,
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    return user;
  }

  /**
   * Removes a user by their ID.
   * @param id - The ID of the user to remove.
   * @returns A promise that resolves to the removed User entity or null if not found.
   */
  async remove(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
