import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.model';
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
   * @param userModel - The Mongoose model for the User entity.
   * @param jwtService - The JwtService for handling JWT operations.
   */
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
      const existingUser = await this.userModel.findOne({ email: signup.email });
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
      const newUser = new this.userModel(signup);
      console.log("Creating new user:", newUser);
  
      await newUser.save();
      if (!newUser) {
        throw new HttpException(
          {
            message: 'Signup Failed',
            details: 'User Creation Failed',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
  
      // Generate a JWT token
      const token = await this.jwtService.sign({ _id: newUser._id });
      console.log("Generated token:", token);
  
      if (!token) {
        throw new HttpException(
          {
            message: 'Token Error',
            details: 'Token Generation Failed',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
  
      return token;
    } catch (error) {
      console.error("Error during signup:", error);
  
      // Return user-friendly error response
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
    const user = await this.userModel.findOne({ ...login });
    if (!user) {
      throw new HttpError('No Account Found', login, HttpStatus.NOT_FOUND);
    }

    const token = await this.jwtService.sign({ _id: user._id });

    if (!token) {
      throw new HttpError(
        'Token Error',
        'Token Generation Failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return token;
  }

  async findOrCreateGoogleUser(user: any): Promise<UserDocument> {
    let existingUser = await this.userModel.findOne({ email: user.email });
    if (!existingUser) {
      
      const newUserData = {
        email: user.email,
        password: 'google-oauth-password',
      };
      console.log(newUserData)
      existingUser = new this.userModel(newUserData);
      await existingUser.save();
    }
    return existingUser;
  }
  
  async generateJwtToken(user: UserDocument): Promise<string> {
    const token = await this.jwtService.sign({ _id: user._id });
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
