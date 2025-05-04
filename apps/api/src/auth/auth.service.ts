import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/schema/user.model';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import { JwtService } from 'jwt/jwt.service';
import { HttpError } from 'http/error';

/**
 * Service responsible for authentication operations.
 */
@Injectable()
export class AuthService {
  /**
   * Constructor for AuthService.
   * @param userRepository - The TypeORM repository for the User entity.
   * @param jwtService - The JwtService for handling JWT operations.
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Handles user signup.
   * @param signup - The SignupDTO containing user signup information.
   * @returns A JWT token upon successful signup.
   * @throws HttpError if signup fails or token generation fails.
   */
  async signup(signup: SignupDTO): Promise<string> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: signup.email },
      });
      if (existingUser) {
        throw new HttpException(
          {
            message: 'Signup Failed',
            details: 'User with this email already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      // Create a new user
      const newUser = this.userRepository.create(signup);
      await this.userRepository.save(newUser);

      // Generate a JWT token
      const token = await this.jwtService.sign({ id: newUser.id });

      return token;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'An error occurred during signup',
          details: error.response?.details || error,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Handles user login.
   * @param login - The LoginDTO containing user login information.
   * @returns A JWT token upon successful login.
   * @throws HttpError if no account is found, or token generation fails.
   */
  async login(login: LoginDTO): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email: login.email, password: login.password },
    });

    if (!user) {
      throw new HttpError('No Account Found', login, HttpStatus.NOT_FOUND);
    }

    const token = await this.jwtService.sign({ id: user.id });

    return token;
  }

  /**
   * Finds or creates a Google OAuth user.
   * @param user - Google user information.
   * @returns The user entity.
   */
  async findOrCreateGoogleUser(user: any): Promise<User> {
    let existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!existingUser) {
      const newUser = this.userRepository.create({
        email: user.email,
        password: 'google-oauth-password', // Placeholder for OAuth users
      });
      existingUser = await this.userRepository.save(newUser);
    }

    return existingUser;
  }

  /**
   * Generates a JWT token for the user.
   * @param user - The user entity.
   * @returns The generated JWT token.
   */
  async generateJwtToken(user: User): Promise<string> {
    const token = await this.jwtService.sign({ id: user.id });

    if (!token) {
      throw new HttpError(
        'Token Error',
        'Token Generation Failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return token;
  }
}
