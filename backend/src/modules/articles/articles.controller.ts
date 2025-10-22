// src/articles/articles.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service.js';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }
}
