import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { ResponseService } from 'src/common/response/response.service';

@Controller('preference')
export class PreferenceController {
  constructor(
    private readonly preferenceService: PreferenceService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(@Body() createPreferenceDto: CreatePreferenceDto) {
    const prefernce = await this.preferenceService.create(createPreferenceDto);
    return this.responseService.successResponse(
      'New Prefernce Created Sucessfully',
      201,
      prefernce,
    );
  }

  @Get()
  findAll() {
    return this.preferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferenceService.update(+id, updatePreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenceService.remove(+id);
  }
}
