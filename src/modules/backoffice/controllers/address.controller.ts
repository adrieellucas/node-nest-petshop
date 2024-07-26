import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { Address } from "../models/address.model";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type.enum";

//localhost:4000/v1/addresses
@Controller('v1/customers')
export class AddressesController {
    constructor(
        private readonly addressService: AddressService,
    ) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document: string, @Body() model: Address) {
        try {
            await this.addressService.create(document, model, AddressType.Billing);
            return new Result('Endereço criado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível criar o endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShppingAddress(@Param('document') document: string, @Body() model: Address) {
        try {
            await this.addressService.create(document, model, AddressType.Shipping);
            return new Result('Endereço criado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível criar o endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}