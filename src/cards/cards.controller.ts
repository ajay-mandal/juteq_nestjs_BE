import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiBody({
    type: CreateCardDto,
    examples: {
      example1: {
        value: {
          title: 'hello',
          description: 'hello_t',
        },
        summary: 'Basic Card Creation',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created.',
    schema: {
      example: {
        id: '23e97cbd-36f4-42b6-9b9b-0e2ab545693f',
        title: 'hello',
        description: 'hello_t',
        imageUrl: null,
        category: null,
        status: 'active',
        createdAt: '2024-03-19T10:00:00.000Z',
        updatedAt: '2024-03-19T10:00:00.000Z',
      },
    },
  })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  @ApiResponse({
    status: 200,
    description: 'Return all cards',
    schema: {
      type: 'array',
      items: {
        example: {
          id: '23e97cbd-36f4-42b6-9b9b-0e2ab545693f',
          title: 'hello',
          description: 'hello_t',
          imageUrl: null,
          category: null,
          status: 'active',
          createdAt: '2024-03-19T10:00:00.000Z',
          updatedAt: '2024-03-19T10:00:00.000Z',
        },
      },
    },
  })
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the card to retrieve',
    example: '23e97cbd-36f4-42b6-9b9b-0e2ab545693f',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the card',
    schema: {
      example: {
        id: '23e97cbd-36f4-42b6-9b9b-0e2ab545693f',
        title: 'hello',
        description: 'hello_t',
        imageUrl: null,
        category: null,
        status: 'active',
        createdAt: '2024-03-19T10:00:00.000Z',
        updatedAt: '2024-03-19T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Card not found' })
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a card' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the card to update',
    example: '23e97cbd-36f4-42b6-9b9b-0e2ab545693f',
  })
  @ApiBody({
    type: UpdateCardDto,
    examples: {
      example1: {
        value: {
          title: 'hello_222',
          description: 'hello_t_updated_tt',
        },
        summary: 'Update Card Example',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully updated.',
    schema: {
      example: {
        id: '23e97cbd-36f4-42b6-9b9b-0e2ab545693f',
        title: 'hello_222',
        description: 'hello_t_updated_tt',
        imageUrl: null,
        category: null,
        status: 'active',
        createdAt: '2024-03-19T10:00:00.000Z',
        updatedAt: '2024-03-19T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Card not found' })
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a card' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the card to delete',
    example: '3698c253-3242-4b44-a3b7-0a7d6e87c370',
  })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully deleted.',
    schema: {
      example: {
        message:
          'Card with ID 3698c253-3242-4b44-a3b7-0a7d6e87c370 has been successfully deleted',
        deletedCard: {
          id: '3698c253-3242-4b44-a3b7-0a7d6e87c370',
          title: 'hello',
          description: 'hello_t',
          imageUrl: null,
          category: null,
          status: 'active',
          createdAt: '2024-03-19T10:00:00.000Z',
          updatedAt: '2024-03-19T10:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Card not found' })
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
