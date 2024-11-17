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
  async findAll() {
    const preferences = await this.preferenceService.findAll();
    return this.responseService.successResponse(
      'Prefernces Listed sucessfully',
      201,
      preferences,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenceService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    const updatedPrefernce = await this.preferenceService.update(
      +id,
      updatePreferenceDto,
    );
    return this.responseService.successResponse(
      'Prefernce updated sucessfully',
      204,
      updatedPrefernce,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenceService.remove(+id);
  }
}
