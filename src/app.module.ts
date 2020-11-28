import { AuthModule } from './auth/auth.module';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest-test')
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HelmetMiddleware)
      .forRoutes('');
  }
}
