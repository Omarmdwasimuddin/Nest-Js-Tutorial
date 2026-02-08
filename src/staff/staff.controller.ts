import { Controller, Get, Post } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Post()
    async createStaff() {
      return this.staffService.createStaff();
    }

    @Get()
    async findAll() {
      return this.staffService.findAll();
    }

}
