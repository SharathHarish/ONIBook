import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: createAuthorDto,
    });
  }

  async getAllAuthors() {
    return this.prisma.author.findMany();
  }

  async getAuthorById(id: number) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });
    if (!author) throw new NotFoundException(`Author with ID ${id} not found`);
    return author;
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
    // Ensure author exists
    await this.getAuthorById(id);
    return this.prisma.author.update({
      where: { id },
      data: updateAuthorDto,
    });
  }

  async deleteAuthor(id: number) {
    await this.getAuthorById(id);
    return this.prisma.author.delete({
      where: { id },
    });
  }
}
