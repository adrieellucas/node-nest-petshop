import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';
import { PetController } from './controllers/pet.controller';
import { AddressesController } from './controllers/address.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        HttpModule,
        CacheModule.register(),
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema,
            },
            {
                name: 'User',
                schema: UserSchema,
            },
        ])],
    controllers: [CustomerController, PetController, AddressesController],
    providers: [
        AccountService,
        CustomerService,
        AddressService,
        PetService,
    ],
})
export class BackofficeModule { }
