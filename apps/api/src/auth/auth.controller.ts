import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { LoginDTO, SignupDTO } from './dto/auth.dto';
import OK from 'response/Ok';
import errorHandler from 'http/httpErrorHandler';
import { JwtService } from 'jwt/jwt.service';
import axios from 'axios';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  @ApiOperation({
    summary: 'User Signup',
    description: 'Endpoint to create a new user account.',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns a token upon successful signup.',
  })
  async signup(
    @Res() res: Response,
    @Body(new ValidationPipe()) body: SignupDTO,
  ) {
    try {
      const data = body;
      console.log(body);
      const token = await this.authService.signup(data);
      return OK(res, 'Signup Success', { token }, HttpStatus.CREATED);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Post('login')
  @ApiOperation({
    summary: 'User Login',
    description: 'Endpoint to authenticate and log in a user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a token upon successful login.',
  })
  async login(
    @Res() res: Response,
    @Body(new ValidationPipe()) body: LoginDTO,
  ) {
    try {
      const data = body;
      const token = await this.authService.login(data);
      return OK(res, 'Login Success', { token }, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google Login', description: 'Login with Google.' })
  async googleAuth(@Req() req) {
    // Initiates Google login
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google Redirect',
    description: 'Google login redirect URI.',
  })
  async googleAuthRedirect(@Res() res: Response, @Req() req) {
    try {
      console.log(req.user);
      const user = await this.authService.findOrCreateGoogleUser(req.user);
      const token = await this.authService.generateJwtToken(user);
      return OK(res, 'Success', { token }, HttpStatus.OK);
    } catch (error) {
      return errorHandler(error, res);
    }
  }
  @Post('google/login')
  async googleLogin(@Body() body: { token: string }, @Res() res: Response) {
    try {
      const { data } = await axios.post(
        'https://oauth2.googleapis.com/tokeninfo',
        {
          id_token: body.token,
        },
      );

      const user = await this.authService.findOrCreateGoogleUser(data);
      const jwtToken = this.jwtService.sign({ userId: user.id });

      return res.json({ token: jwtToken });
    } catch (error) {
      console.error('Error during Google login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Google login failed',
        details: error.message,
      });
    }
  }
}
