// src/articles/articles.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ArticlesService {
  private supabase: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_KEY required');
    this.supabase = createClient(url, key);
  }

  async findBySlug(slug: string) {
    // 1) fetch article by slug
    const { data: articles, error: articleError } = await this.supabase
      .from('survey_articles')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();

    if (articleError || !articles) {
      throw new NotFoundException('Article not found');
    }
    const article = articles;

    // 2) fetch blocks by slug_survey (you mentioned slug_survey FK to survey_articles.slug)
    const { data: blocks, error: blocksError } = await this.supabase
      .from('survey_article_blocks')
      .select('*')
      .eq('slug_survey', slug)
      .order('ordering', { ascending: true });

    if (blocksError) {
      // don't throw NotFound here -- return article with empty blocks
      console.warn('blocksError', blocksError);
    }

    // 3) parse content (stored as text containing JSON)
    const parsedBlocks = (blocks || []).map((b: any) => {
      let contentParsed: any = null;
      try {
        contentParsed = b.content ? JSON.parse(b.content) : null;
      } catch (err) {
        // if parse fails, fallback to raw text
        contentParsed = b.content;
      }
      return {
        id: b.id,
        ordering: b.ordering,
        block_type: b.block_type,
        content: contentParsed,
      };
    });

    // 4) return combined object
    return {
      id: article.id,
      slug: article.slug,
      title: article.title,
      header_image: article.header_image,
      respondents: article.respondents,
      period: article.period,
      method: article.method,
      survey_type: article.survey_type,
      // add any other fields from survey_articles as needed
      blocks: parsedBlocks,
    };
  }
}
