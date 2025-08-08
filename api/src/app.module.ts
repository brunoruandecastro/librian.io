import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { GatewaysModule } from './gateways/gateways.module';

@Module({
  imports: [UserModule, GatewaysModule],
  controllers: [AppController, BookController],
  providers: [AppService, BookService, PrismaService],
})
export class AppModule { }
