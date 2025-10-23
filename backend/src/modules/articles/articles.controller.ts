import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service.js';
import { CreateArticleDto } from './dto/create-article.dto.js';
import { UpdateArticleDto } from './dto/update-article.dto.js';
import { CreateBlockDto } from './dto/create-blocks.dto.js';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Post()
  async createArticle(@Body() dto: CreateArticleDto) {
    return this.articlesService.createArticleWithBlocks(dto);
  }

  @Put(':slug')
  async updateArticle(
    @Param('slug') slug: string,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticleBySlug(slug, dto);
  }

  @Delete(':slug')
  async deleteArticle(@Param('slug') slug: string) {
    return this.articlesService.deleteArticleBySlug(slug);
  }

  @Post(':slug/blocks')
  async createBlocks(
    @Param('slug') slug: string,
    @Body() blocks: CreateBlockDto[],
  ) {
    return this.articlesService.createBlocksBulk(slug, blocks);
  }
}
