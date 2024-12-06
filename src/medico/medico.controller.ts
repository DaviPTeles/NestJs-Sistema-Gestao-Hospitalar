import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Controller('medico')
export class MedicoController {
    constructor(private readonly medicoService:MedicoService){}

    @Post('')
    create(@Body() createMedicoDto:CreateMedicoDto){
        return this.medicoService.create(createMedicoDto)
    }

    @Get('')
    listAll(){
        return this.medicoService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.medicoService.getMedicosById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMedicoDto:UpdateMedicoDto){
        return this.medicoService.update(id, updateMedicoDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.medicoService.remove(id)
    }
}