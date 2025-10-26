// src/modules/admins/admins.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(private readonly supabase: SupabaseService) {}

async validateAdmin(username: string, password: string) {
  const supabase = this.supabase.client;

  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !admin) return null;

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return null;

  return admin;
}


  async findAll(limit: number, offset: number) {
    const client = this.supabase.client;

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
      .client
      .from('admins')
      .insert(newAdmin)
      .select();
  }

  async update(id: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.supabase
      .client
      .from('admins')
      .update(data)
      .eq('id', id)
      .select();
  }

  async remove(id: string) {
    return this.supabase
      .client
      .from('admins')
      .delete()
      .eq('id', id);
  }
}
