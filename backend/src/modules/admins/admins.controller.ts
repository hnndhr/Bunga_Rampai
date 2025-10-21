// src/modules/admins/admins.controller.ts
import { Controller, Get, Post, Patch, Delete, Query, Param, Body } from '@nestjs/common';
import { AdminsService } from './admins.service.js';

@Controller('connect/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  async getAdmins(@Query('page') page = 1, @Query('limit') limit = 5) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    const { data, error } = await this.adminsService.findAll(limitNum, offset);

    if (error) return { status: 'ERROR', error };

    // **Solution: Explicitly check that 'data' is defined before accessing its properties**
    if (!data) {
        // Handle the case where there is no error but also no data (shouldn't typically happen 
        // if findAll is successful, but satisfies the type checker)
        return { 
            status: 'OK', 
            data: [], 
            page: pageNum, 
            totalPages: 1 
        };
    }

    // Supabase count -> totalRows
    const totalRows = data?.length < limitNum ? offset + data.length : offset + limitNum;
    const totalPages = Math.ceil(totalRows / limitNum) || 1;

    return {
      status: 'OK',
      data,
      page: pageNum,
      totalPages,
    };
  }

  @Post('create')
  async createAdmin(@Body() body: any) {
    const { data, error } = await this.adminsService.create(body);
    if (error) return { status: 'ERROR', error };
    return { status: 'OK', data };
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
