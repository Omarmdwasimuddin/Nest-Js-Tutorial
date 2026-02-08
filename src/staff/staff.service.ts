import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Staff } from './schemas/staff.schema';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<Staff>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createStaff(): Promise<Staff> {

    const profile = await new this.profileModel({
      age: 30,
      qualification: "MBA",
      experience: 5,
    }).save();

    const staff = new this.staffModel({
      name: "John Doe",
      profile: profile._id,
    });

    return staff.save();
  }

  async findAll(): Promise<Staff[]> {
    return this.staffModel.find().populate('profile').exec();
  }
}