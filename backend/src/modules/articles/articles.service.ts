import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateArticleDto } from './dto/create-article.dto.js';
import { CreateBlockDto } from './dto/create-blocks.dto.js';
import { UpdateArticleDto } from './dto/update-article.dto.js';

@Injectable()
export class ArticlesService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(ArticlesService.name);

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_KEY required');
    this.supabase = createClient(url, key);
  }

  /** Find by slug, return article & blocks */
  async findBySlug(slug: string) {
    const { data: article, error: articleError } = await this.supabase
      .from('survey_articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (articleError || !article) {
      throw new Error('Article not found');
    }

    const { data: blocks } = await this.supabase
      .from('survey_article_blocks')
      .select('*')
      .eq('slug_survey', slug)
      .order('ordering');

    const parsedBlocks = (blocks || []).map((b: any) => {
      let contentParsed = null;
      try {
        contentParsed = b.content ? JSON.parse(b.content) : null;
      } catch {
        contentParsed = b.content;
      }
      return {
        id: b.id,
        ordering: b.ordering,
        block_type: b.block_type,
        content: contentParsed,
      };
    });

    return { ...article, blocks: parsedBlocks };
  }

  /** Validate max 1 infographic_desc */
  private validateInfographicBlocks(blocks: CreateBlockDto[]) {
    const count = blocks.filter((b) => b.block_type === 'infographic_desc')
      .length;
    if (count > 1) {
      throw new BadRequestException('Only one infographic_desc block is allowed');
    }
  }

  /** Create article + blocks */
  async createArticleWithBlocks(dto: CreateArticleDto) {
    const { blocks, ...articlePayload } = dto;

    if (!articlePayload.slug) {
      throw new BadRequestException('slug is required');
    }

    if (Array.isArray(blocks)) {
      this.validateInfographicBlocks(blocks);
    }

    const { data: articleData, error: articleError } = await this.supabase
      .from('survey_articles')
      .insert([articlePayload])
      .select('id,slug')
      .single();

    if (articleError) throw articleError;

    const insertedSlug = articleData.slug;
    let insertedBlocks: any[] = [];

    if (Array.isArray(blocks) && blocks.length > 0) {
      const payload = blocks.map((b, idx) => ({
        ordering: typeof b.ordering === 'number' ? b.ordering : idx + 1,
        block_type: b.block_type,
        content:
          typeof b.content === 'string'
            ? b.content
            : JSON.stringify(b.content),
        slug_survey: insertedSlug,
      }));

      const { data: blocksData, error: blocksError } = await this.supabase
        .from('survey_article_blocks')
        .insert(payload)
        .select();

      if (blocksError) {
        await this.supabase.from('survey_articles').delete().eq('slug', insertedSlug);
        throw blocksError;
      }

      insertedBlocks = blocksData || [];
    }

    return { article: articleData, blocks: insertedBlocks };
  }

  /** Update article + (optional) replace blocks */
  async updateArticleBySlug(slug: string, dto: UpdateArticleDto) {
    const { blocks, ...articleFields } = dto;

    if (Object.keys(articleFields).length) {
      const { error: updateError } = await this.supabase
        .from('survey_articles')
        .update(articleFields)
        .eq('slug', slug)
        .single();
      if (updateError) throw updateError;
    }

    if (Array.isArray(blocks)) {
      this.validateInfographicBlocks(blocks);

      const { error: delErr } = await this.supabase
        .from('survey_article_blocks')
        .delete()
        .eq('slug_survey', slug);

      if (delErr) throw delErr;

      const payload = blocks.map((b, idx) => ({
        ordering: typeof b.ordering === 'number' ? b.ordering : idx + 1,
        block_type: b.block_type,
        content:
          typeof b.content === 'string'
            ? b.content
            : JSON.stringify(b.content),
        slug_survey: slug,
      }));

      const { error: insertErr } = await this.supabase
        .from('survey_article_blocks')
        .insert(payload);

      if (insertErr) throw insertErr;
    }

    return { message: 'updated' };
  }

  /** Bulk insert (management screen use case) */
  async createBlocksBulk(slug: string, blocks: CreateBlockDto[]) {
    if (!slug) throw new BadRequestException('slug is required');
    if (!blocks || blocks.length === 0) return { inserted: 0, data: [] };

    this.validateInfographicBlocks(blocks);

    const payload = blocks.map((b, idx) => ({
      ordering: typeof b.ordering === 'number' ? b.ordering : idx + 1,
      block_type: b.block_type,
      content:
        typeof b.content === 'string'
          ? b.content
          : JSON.stringify(b.content),
      slug_survey: slug,
    }));

    const { data, error } = await this.supabase
      .from('survey_article_blocks')
      .insert(payload)
      .select();

    if (error) throw error;

    return { inserted: data.length, data };
  }
}
