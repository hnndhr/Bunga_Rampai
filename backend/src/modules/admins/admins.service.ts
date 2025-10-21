// src/modules/admins/admins.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll(limit: number, offset: number) {
    const client = this.supabase.getClient();

    const { data, error } = await client
      .from('admins')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);

    return { data, error };
  }

  async create(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);
    const newAdmin = { ...data, password: hashed};

    return this.supabase
      .getClient()
      .from('admins')
      .insert(newAdmin)
      .select();
  }

  async update(id: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.supabase
      .getClient()
      .from('admins')
      .update(data)
      .eq('id', id)
      .select();
  }

  async remove(id: string) {
    return this.supabase
      .getClient()
      .from('admins')
      .delete()
      .eq('id', id);
  }
}
