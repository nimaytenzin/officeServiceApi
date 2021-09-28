import { Controller, Body, Post, UseInterceptors, NotFoundException, Param, Delete, Get, UploadedFiles, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/utils/fileupload';
import { StaffDto } from './dto/staff.dto';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file) {

    console.log(file);
    // staff.profile_uri = file.path;
    // staff.signature_uri = file.path;
    // return await this.staffService.create(staff);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.staffService.findOneById(id);
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
