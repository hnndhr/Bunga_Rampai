import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { AdminsService } from './admins.service.js';
import { AuthService } from '../auth/auth.services.js';
import { LimiterService } from '../../common/limiter.service.js';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly authService: AuthService,
    private readonly limiterService: LimiterService,
  ) {}

  @Post('login')
  async login(@Body() body: any, @Req() req) {
    const { username, password } = body;
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';

    // 🔹 Cek dulu rate limit
    await this.limiterService.checkLoginAttempt(username, ip);

    const result = await this.authService.login(username, password, ip);

    if (!result) {
      return { status: 'ERROR', message: 'Invalid credentials' };
    }

    // 🔹 Reset attempt setelah sukses login
    await this.limiterService.resetLoginAttempt(username, ip);

    return { status: 'OK', token: result.token };
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    return this.adminsService.findAll(pageNum, limitNum);
  }

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

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    const { error } = await this.adminsService.remove(id);
    if (error) return { status: 'ERROR', error };
    return { status: 'OK' };
  }
}
