// src/borrowing/borrowing.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  // Any authenticated user can borrow a book
  @Post('borrow')
  borrowBook(@Body() dto: BorrowBookDto) {
    return this.borrowingService.borrowBook(dto);
  }

  // Any authenticated user can return a book
  @Post('return')
  returnBook(@Body() dto: ReturnBookDto) {
    return this.borrowingService.returnBook(dto);
  }

  // Admin can see all borrowings
  @Roles('ADMIN')
  @Get('all')
  getAllBorrowings() {
    return this.borrowingService.getAllBorrowings();
  }
}
