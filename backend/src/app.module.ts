import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AuthorsModule,
    BooksModule,
    BorrowingModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
