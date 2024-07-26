import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { QueryDto } from "../dtos/query.dto";
import { PetService } from "../services/pet.service";
import { AddressService } from "../services/address.service";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { CreateCreditCardContract } from "../contracts/customer/create-credit-card.contract";
import { CreditCard } from "../models/credit-card.module";
import { QueryContract } from "../contracts/query.contract";

//localhost:4000/v1/customers
@Controller('v1/customers')
export class CustomerController {
    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService,
    ) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, true));
            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            const respose = await this.customerService.create(customer);
            return new Result('Cliente criado com sucesso!', true, respose, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível criar o cliente', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async updatePet(@Param('document') document: string, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(document, model);
            return new Result('Cliente atualizado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAll() {
        const customers = await this.customerService.findAll();
        return new Result('Clientes consultados com sucesso!', true, customers, null);
    }

    @Get(':document')
    async get(@Param('document') document: string) {
        const customer = await this.customerService.find(document);
        return new Result('Cliente consultado com sucesso!', true, customer, null);
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createCreditCard(@Param('document') document: string, @Body() model: CreditCard) {
        try {
            await this.customerService.saveOrUpdateCreditCard(document, model);
            return new Result('Cartão atualizado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar o cartão', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}