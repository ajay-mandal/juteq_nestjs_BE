import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({
    description: 'The title of the card',
    example: 'My Card Title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the card',
    example: 'This is a detailed description of the card',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'URL of the card image',
    example: 'https://example.com/image.jpg',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'Category of the card',
    example: 'technology',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Status of the card',
    example: 'active',
    required: false,
    default: 'active',
  })
  @IsOptional()
  @IsString()
  status?: string;
}
