import { Controller, Body, Post, UseInterceptors, NotFoundException, Param, Delete, Get, UploadedFiles, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/utils/fileupload';
import { StaffDto } from './dto/staff.dto';
import { Staff } from './staff.entity';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) { }

  @Post()
  async create(@Body() staff: StaffDto) {
    console.log(staff)
    return await this.staffService.create(staff);
  }

  @Get()
  async findAll():Promise<Staff[]>{
      return await this.staffService.findAll();
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() staff: StaffDto) {
    const { numRows, num } = await this.staffService.update(id, staff);
    if (numRows === 0) {
      throw new NotFoundException('This User doesn\'t exist');
    }
    return 'Updated sccuessfully';
  }

  @Put(':id/uploadProfile')
  @UseInterceptors( FileInterceptor('file', {
    storage: diskStorage({
      destination: Helper.profileFolder,
      filename: Helper.customFileName,
    }),
  }),)
  async updateProfile(@UploadedFile() file, @Param('id') id:number) {
    console.log(id, file);
    let data ={
      profile_uri: "profiles/"+file.filename
    }
    return await this.staffService.update(id,data);
  }

  @Put(':id/uploadSignature')
  @UseInterceptors( FileInterceptor('file', {
    storage: diskStorage({
      destination: Helper.signatureFolder,
      filename: Helper.customFileName,
    }),
  }),)
  async updateSignature(@UploadedFile() file, @Param('id') id:number) {
    console.log(id, file);
    let data ={
      signature_uri: "signatures/"+file.filename
    }
    return await this.staffService.update(id,data);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.staffService.findOneById(id);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    return await this.staffService.findOneByEmail(email);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.staffService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException('This Letter doesnot exist');
    }

    return 'Successfully Deleted';
  }
}
