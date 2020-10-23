import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: 'srs.mailer786@gmail.com',
          pass: 'fiver123',
        },
        tls: {
          rejectUnauthorized: true,
        },
      },
    }),
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://hassan123:hassan123@nestjswithmongo.hlo3r.mongodb.net/nestJSWithMongoDB?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
