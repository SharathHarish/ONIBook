import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';


@Module({
imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, AuthorsModule, BooksModule, BorrowModule],
providers: [PrismaService],
})
export class AppModule {}