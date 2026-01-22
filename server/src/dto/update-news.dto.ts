import { IsString, IsOptional } from 'class-validator';

export class UpdateNewsDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  author?: string;

  // Multi-language fields
  @IsString()
  @IsOptional()
  titleRu?: string;

  @IsString()
  @IsOptional()
  titleKz?: string;

  @IsString()
  @IsOptional()
  titleEn?: string;

  @IsString()
  @IsOptional()
  contentRu?: string;

  @IsString()
  @IsOptional()
  contentKz?: string;

  @IsString()
  @IsOptional()
  contentEn?: string;

  @IsString()
  @IsOptional()
  categoryRu?: string;

  @IsString()
  @IsOptional()
  categoryKz?: string;

  @IsString()
  @IsOptional()
  categoryEn?: string;
}
