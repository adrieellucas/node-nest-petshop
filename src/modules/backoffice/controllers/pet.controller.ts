import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ResultDto } from "../dtos/result.dto";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreatePetContract } from "../contracts/pet/create-pet.contract";
import { Pet } from "../models/pet.model";
import { PetService } from "../services/pet.service";

//localhost:4000/v1/customers
@Controller('v1/pets')
export class PetController {
    constructor(
        private readonly petService: PetService,
    ) { }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document: string, @Body() model: Pet) {
        try {
            await this.petService.create(document, model);
            return new ResultDto('Pet criado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível criar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }


    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document: string, @Param('id') id: string, @Body() model: Pet) {
        try {
            await this.petService.update(document, id, model);
            return new ResultDto('Pet atualizado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar o pet', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}