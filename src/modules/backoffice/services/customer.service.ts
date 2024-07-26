import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { CreditCard } from '../models/credit-card.module';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {
    }
    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, data);
    }

    async findAll(): Promise<Customer[]> {
        return await this.model.find({}, 'name email document')
            .sort('name') //'-name' order para mais ou menos
            .exec();  //'-password'
    }

    async find(document: string): Promise<Customer> {
        return await this.model.findOne({ document })
            .populate('user', 'username')
            .exec();
    }

    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model.find(model.query, model.fields,
            {
                skip: model.skip,
                limit: model.take,
            })
            .sort(model.sort)
            .exec();
    }

    async saveOrUpdateCreditCard(document: string, data: CreditCard): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                card: data,
            },
        });
    }
}