import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller('consulta')
export class ConsultaController {
    constructor(private readonly consultaService:ConsultaService){}

    @Post('')
    createconsulta(@Body() createConsultaDto: CreateConsultaDto){
        return this.consultaService.createConsulta(createConsultaDto)
    }

    @Get('')
    findAllConsultas(){
        return this.consultaService.findAllConsultas()
    }

    @Get(':id')
    findOneConsulta(@Param('id') id: string){
        return this.consultaService.getConsultaById(id)
    }

    @Put(':id')
    updateConsulta(@Param('id') id: string,@Body() updateMedicoDto: UpdateConsultaDto){
        return this.consultaService.updateConsulta(id, updateMedicoDto)
    }

    @Delete(':id')
    deleteConsulta(@Param('id') id: string){
        return this.consultaService.removeConsulta(id)
    }
}
