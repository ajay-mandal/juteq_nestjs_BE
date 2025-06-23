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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example1: {
        value: {
          email: 'user@example.com',
          password: '123456',
        },
        summary: 'Basic User Creation',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      example: {
        id: '1b25b51c-95c8-4512-84da-59564a2adf8c',
        email: 'user@example.com',
        name: null,
        role: 'user',
        createdAt: '2024-03-19T10:00:00.000Z',
        updatedAt: '2024-03-19T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    schema: {
      type: 'array',
      items: {
        example: {
          id: '1b25b51c-95c8-4512-84da-59564a2adf8c',
          email: 'user@example.com',
          name: null,
          role: 'user',
          createdAt: '2024-03-19T10:00:00.000Z',
          updatedAt: '2024-03-19T10:00:00.000Z',
        },
      },
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to retrieve',
    example: '1b25b51c-95c8-4512-84da-59564a2adf8c',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the user',
    schema: {
      example: {
        id: '1b25b51c-95c8-4512-84da-59564a2adf8c',
        email: 'user@example.com',
        name: null,
        role: 'user',
        createdAt: '2024-03-19T10:00:00.000Z',
        updatedAt: '2024-03-19T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to update',
    example: '1b25b51c-95c8-4512-84da-59564a2adf8c',
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      example1: {
        value: {
          email: 'updated@example.com',
          password: '123456_updated',
          name: 'Updated Name',
        },
        summary: 'Update User Example',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    schema: {
      example: {
        id: '1b25b51c-95c8-4512-84da-59564a2adf8c',
        email: 'updated@example.com',
        name: 'Updated Name',
        role: 'user',
        createdAt: '2024-03-19T10:00:00.000Z',
        updatedAt: '2024-03-19T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to delete',
    example: '9d469170-651c-449c-a00c-aca77dd393df',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    schema: {
      example: {
        message:
          'User with ID 9d469170-651c-449c-a00c-aca77dd393df has been successfully deleted',
        deletedUser: {
          id: '9d469170-651c-449c-a00c-aca77dd393df',
          email: 'user@example.com',
          name: null,
          role: 'user',
          createdAt: '2024-03-19T10:00:00.000Z',
          updatedAt: '2024-03-19T10:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
