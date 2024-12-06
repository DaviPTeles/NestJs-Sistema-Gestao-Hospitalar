import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { MedicoService } from 'src/medico/medico.service';
import { PacienteService } from 'src/paciente/paciente.service';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Injectable()
export class ConsultaService {
    constructor(private readonly repository:PrismaService,private readonly medicoService:MedicoService, private readonly pacienteService:PacienteService){}

    async createConsulta(createConsultaDto:CreateConsultaDto){
        const medico = await this.medicoService.getMedicosById(createConsultaDto.medicoId)

        if(!medico){
            throw new HttpException('Médico não encontrado!', HttpStatus.NOT_FOUND)
        }

        const paciente = await this.pacienteService.getPacienteById(createConsultaDto.pacienteId)

        if(!paciente){
            throw new HttpException('Paciente não encontrado', HttpStatus.NOT_FOUND)
        }

        if(new Date(createConsultaDto.data)<new Date){
            throw new HttpException('Data Invalída', HttpStatus.BAD_REQUEST)
        }

        const consultaMedico = await this.repository.consulta.findMany({
            where: {
                medicoId: createConsultaDto.medicoId,
                data: new Date(createConsultaDto.data)
            }
        })

        if(consultaMedico.length>0){
            return new HttpException('O médico já possui uma consulta marcada neste horário!', HttpStatus.BAD_REQUEST)
        }

        const consultaPaciente = await this.repository.consulta.findMany({
            where:{
                pacienteId: createConsultaDto.pacienteId,
                data: new Date(createConsultaDto.data)
            }
        })

        if(consultaPaciente.length>0){
            return new HttpException('O paciente já possui uma consulta marcada nesse horário', HttpStatus.BAD_REQUEST)
        }

        await this.repository.consulta.create({
            data: {
                data: new Date(createConsultaDto.data),
                medicoId: createConsultaDto.medicoId,
                pacienteId: createConsultaDto.pacienteId,
                observacoes: createConsultaDto.observacoes
            }
        })
        return "Consulta criada com sucesso!"
    }

    async findAllConsultas(){
        return this.repository.consulta.findMany({
            select:{
                id: true,
                data: true,
                observacoes: true,
                medico: {
                    select:{
                        nome: true,
                        especialidade: true
                    }
                },
                paciente: {
                    select: {
                        nome: true,
                        telefone: true,
                        email: true
                    }
                }
            }
        })
    }
    async getConsultaById(id: string){
        const consulta = await this.repository.consulta.findUnique({
            where: {id: id},
            include: {
                medico: true,
                paciente: true
            }
        })

        if(!consulta){
            return new HttpException('Consulta não encontrada!', HttpStatus.NOT_FOUND)
        }
        return consulta;
    }

    async updateConsulta(id: string, updateConsultadto: UpdateConsultaDto){
        const consultaExists = await this.repository.consulta.findUnique({
            where: {id}
        }) 
        
        if(!consultaExists){
            return new HttpException('Consulta não encontrada!', HttpStatus.NOT_FOUND)
        }

        await this.repository.consulta.update({
            where:{id},
            data: updateConsultadto
        })

        return "Consulta atualizada com sucesso!"
    }
    
    async removeConsulta(id: string){
        const consultaExists = await this.repository.consulta.findUnique({
            where: {id}
        })

        if(!consultaExists){
            return new HttpException('Consulta não encontrada!', HttpStatus.NOT_FOUND)
        }

        await this.repository.consulta.delete({
            where: {id}
        })

        return "A consulta foi removida com sucesso!"
    }

}
