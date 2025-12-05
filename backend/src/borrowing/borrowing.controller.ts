import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  // Borrow a book (admin or user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto) {
    return this.borrowingService.borrowBook(borrowBookDto);
  }

  // Return a book (admin or user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto) {
    return this.borrowingService.returnBook(returnBookDto);
  }

  // List borrowed books for a user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get('user/:userId')
  async getBorrowedBooks(@Param('userId') userId: string) {
    return this.borrowingService.getBorrowedBooks(+userId);
  }
}
