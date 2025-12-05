import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BorrowingController],
  providers: [BorrowingService, PrismaService],
})
export class BorrowingModule {}
