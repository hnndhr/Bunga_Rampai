// src/modules/admins/admins.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AuthService } from '../auth/auth.services.js';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: any) {
    const { username, password } = body;
    const result = await this.authService.login(username, password);

    if (!result) {
      return { status: 'ERROR', message: 'Invalid credentials' };
    }

    return { status: 'OK', token: result.token };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAdmins(@Query('page') page = 1, @Query('limit') limit = 5) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    const { data, error } = await this.adminsService.findAll(limitNum, offset);

    if (error) return { status: 'ERROR', error };

    if (!data) {
      return { status: 'OK', data: [], page: pageNum, totalPages: 1 };
    }

    const totalRows =
      data?.length < limitNum ? offset + data.length : offset + limitNum;
    const totalPages = Math.ceil(totalRows / limitNum) || 1;

    return {
      status: 'OK',
      data,
      page: pageNum,
      totalPages,
    };
  }

  //@UseGuards(JwtAuthGuard)
  @Post('create')
  async createAdmin(@Body() body: any) {
    const { data, error } = await this.adminsService.create(body);
    if (error) return { status: 'ERROR', error };
    return { status: 'OK', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminsService.findById(id);
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id: string, @Body() body: any) {
    const { data, error } = await this.adminsService.update(id, body);
    if (error) return { status: 'ERROR', error };
    return { status: 'OK', data };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    const { error } = await this.adminsService.remove(id);
    if (error) return { status: 'ERROR', error };
    return { status: 'OK' };
  }
}
