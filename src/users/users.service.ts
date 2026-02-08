import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(): Promise<User> {
        const user = new this.userModel({
            name: 'John Doe',
            address: {
                street: '123 Main St',
                city: 'Anytown'
            }
        });
        return user.save();
    }

    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
