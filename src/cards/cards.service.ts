import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        title: createCardDto.title,
        description: createCardDto.description,
        imageUrl: createCardDto.imageUrl,
        category: createCardDto.category,
        status: createCardDto.status,
      },
    });
  }

  async findAll() {
    return this.prisma.card.findMany();
  }

  async findOne(id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    // First check if the card exists
    const existingCard = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!existingCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    // Update the card with the provided data
    return this.prisma.card.update({
      where: { id },
      data: {
        title: updateCardDto.title,
        description: updateCardDto.description,
        imageUrl: updateCardDto.imageUrl,
        category: updateCardDto.category,
        status: updateCardDto.status,
      },
    });
  }

  async remove(id: string) {
    // First check if the card exists
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    // Delete the card
    await this.prisma.card.delete({
      where: { id },
    });
    return {
      message: `Card with ID ${id} has been successfully deleted`,
      deletedCard: card, // Return the deleted card data instead of just the ID
    };
  }
}
