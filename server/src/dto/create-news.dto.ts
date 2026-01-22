import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateNewsDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

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
