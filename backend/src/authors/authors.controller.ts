// src/authors/authors.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAllAuthors() {
    return this.authorsService.getAllAuthors();
  }

  @Roles('ADMIN')
  @Post()
  createAuthor(@Body() dto: CreateAuthorDto) {
    return this.authorsService.createAuthor(dto);
  }

  @Roles('ADMIN')
  @Post(':id')
  updateAuthor(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(Number(id), dto);
  }
}
