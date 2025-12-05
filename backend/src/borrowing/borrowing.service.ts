import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Injectable()
export class BorrowingService {
  constructor(private prisma: PrismaService) {}

  // Borrow a book
  async borrowBook(borrowDto: BorrowBookDto) {
    const { userId, bookId } = borrowDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);

    if (book.isBorrowed) throw new BadRequestException('Book is already borrowed');

    // Mark book as borrowed
    await this.prisma.book.update({
      where: { id: bookId },
      data: { isBorrowed: true },
    });

    // Create borrow record
    return this.prisma.borrowRecord.create({
      data: {
        userId,
        bookId,
        borrowDate: new Date(),
      },
    });
  }

  // Return a book
  async returnBook(returnDto: ReturnBookDto) {
    const { userId, bookId } = returnDto;

    const borrowRecord = await this.prisma.borrowRecord.findFirst({
      where: { userId, bookId, returnDate: null },
    });

    if (!borrowRecord) throw new BadRequestException('No active borrow record found');

    // Update borrow record
    await this.prisma.borrowRecord.update({
      where: { id: borrowRecord.id },
      data: { returnDate: new Date() },
    });

    // Mark book as not borrowed
    return this.prisma.book.update({
      where: { id: bookId },
      data: { isBorrowed: false },
    });
  }

  // List all borrowed books for a user
  async getBorrowedBooks(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    return this.prisma.borrowRecord.findMany({
      where: { userId, returnDate: null },
      include: { book: true },
    });
  }
}
