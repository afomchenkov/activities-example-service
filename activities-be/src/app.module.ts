import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { ActivitiesResolver } from './resolvers/activities.resolver';
import { ActivitiesListResolver } from './resolvers/activities-list.resolver';
import { SuppliersResolver } from './resolvers/suppliers.resolver';
import { DataService } from './services/data.service';
import { GraphqlExceptionsFilter } from './graphql-exceptions.filter';

@Module({
  imports: [
    CacheModule.register({
      ttl: 7200, // 2hr in seconds
      max: 1000, // maximum number of items in cache
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphqlExceptionsFilter,
    },
    ActivitiesListResolver,
    ActivitiesResolver,
    DataService,
    SuppliersResolver,
  ],
})
export class AppModule {}
