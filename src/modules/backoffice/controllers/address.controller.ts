import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { ResultDto } from "../dtos/result.dto";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { Address } from "../models/address.model";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type.enum";
import { lastValueFrom } from "rxjs";

//localhost:4000/v1/addresses
@Controller('v1/addresses')
export class AddressesController {
    constructor(
        private readonly addressService: AddressService,
    ) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document: string, @Body() model: Address) {
        try {
            await this.addressService.create(document, model, AddressType.Billing);
            return new ResultDto('Endereço criado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível criar o endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShppingAddress(@Param('document') document: string, @Body() model: Address) {
        try {
            await this.addressService.create(document, model, AddressType.Shipping);
            return new ResultDto('Endereço criado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível criar o endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode: string) {
        try {
            const response = await lastValueFrom(this.addressService.getAddressByZipCode(zipcode));
            return new ResultDto(null, true, response.data, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível localizar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}