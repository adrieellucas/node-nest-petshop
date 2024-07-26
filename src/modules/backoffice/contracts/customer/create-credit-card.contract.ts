import { Flunt } from "src/utils/flunt";
import { Contract } from "../contract";
import { Injectable } from "@nestjs/common";
import { CreditCard } from "../../models/credit-card.module";

@Injectable()
export class CreateCreditCardContract implements Contract {
    errors: any[];

    validate(model: CreditCard): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.holder, 5, 'Nome no cartão invádlido');
        flunt.isFixedLen(model.number, 5, 'Número do cartão inválido');
        flunt.isFixedLen(model.expiration, 5, 'Data de expiração do cartão inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}