import { Flunt } from "src/utils/flunt";
import { Contract } from "../contract";
import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "../../dtos/customer/create-customer.dto";

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];

    validate(model: CreateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');
        flunt.isEmail(model.email, 'E-mail inválido');
        flunt.isFixedLen(model.document, 5, 'CPF inválido');
        flunt.hasMinLen(model.password, 6, 'Senha inválida');

        /*
        caso queira adicionar validações que não estão dentro do flunt
        precisa ter esse retorno
        if (model.name == "Adriel") {
            this.errros.push({ message: "Adriel não é bem vindo" });
        }
        return this.errros.length === 0;
        */

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}