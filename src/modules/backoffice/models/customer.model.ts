import { Address } from "./address.model";
import { CreditCard } from "./credit-card.module";
import { Pet } from "./pet.model";
import { User } from "./user.model";

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public user: User,
    ) {
 
    }
}