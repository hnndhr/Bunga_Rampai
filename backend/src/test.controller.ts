import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './common/supabase.service.js';

@Controller('test')
export class TestController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get('connection')
  async testConnection() {
    const { data, error } = await this.supabase
      .getClient()
      .from('survey_articles') // pakai nama tabelmu di Supabase
      .select('*')
      .limit(1);

    if (error) {
      return { status: 'ERROR', error };
    }

    return { status: 'OK', data };
  }
}
