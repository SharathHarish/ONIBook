import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  // Admin-only routes
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.updateAuthor(+id, updateAuthorDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string) {
    return this.authorsService.deleteAuthor(+id);
  }

  // Public routes
  @Get()
  async getAllAuthors() {
    return this.authorsService.getAllAuthors();
  }

  @Get(':id')
  async getAuthorById(@Param('id') id: string) {
    return this.authorsService.getAuthorById(+id);
  }
}
