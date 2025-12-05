// src/books/books.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Anyone authenticated can see all books
  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  // Admin only
  @Roles('ADMIN')
  @Post()
  createBook(@Body() dto: CreateBookDto) {
    return this.booksService.createBook(dto);
  }

  @Roles('ADMIN')
  @Post(':id')
  updateBook(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.booksService.updateBook(Number(id), dto);
  }
}
