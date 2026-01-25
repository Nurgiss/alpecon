import { Expose } from 'class-transformer';
import { News } from '@prisma/client';

export class NewsResponseDTO {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  category!: string;

  @Expose()
  image!: string;

  @Expose()
  author!: string;

  @Expose()
  source?: string | null;

  @Expose()
  date!: Date;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  // Multi-language fields
  @Expose()
  titleRu?: string | null;

  @Expose()
  titleKz?: string | null;

  @Expose()
  titleEn?: string | null;

  @Expose()
  contentRu?: string | null;

  @Expose()
  contentKz?: string | null;

  @Expose()
  contentEn?: string | null;

  @Expose()
  categoryRu?: string | null;

  @Expose()
  categoryKz?: string | null;

  @Expose()
  categoryEn?: string | null;

  constructor(partial: Partial<NewsResponseDTO>) {
    Object.assign(this, partial);
  }

  // Static factory method to create from Prisma News entity
  static fromEntity(news: News): NewsResponseDTO {
    return new NewsResponseDTO({
      id: news.id,
      title: news.title,
      content: news.content,
      category: news.category,
      image: news.image,
      author: news.author,
      source: news.source,
      date: news.date,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
      titleRu: news.titleRu,
      titleKz: news.titleKz,
      titleEn: news.titleEn,
      contentRu: news.contentRu,
      contentKz: news.contentKz,
      contentEn: news.contentEn,
      categoryRu: news.categoryRu,
      categoryKz: news.categoryKz,
      categoryEn: news.categoryEn,
    });
  }

  // Static method to create from multiple entities
  static fromEntities(newsList: News[]): NewsResponseDTO[] {
    return newsList.map((news) => NewsResponseDTO.fromEntity(news));
  }
}
