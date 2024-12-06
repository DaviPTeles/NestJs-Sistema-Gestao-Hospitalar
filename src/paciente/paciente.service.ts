import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacienteService {
    constructor (private readonly repository:PrismaService){}

    async create(createPacienteDto:CreatePacienteDto){
        await this.repository.paciente.create({
            data:{
                nome: createPacienteDto.nome,
                email: createPacienteDto.email,
                idade: createPacienteDto.idade,
                telefone: createPacienteDto.telefone
            }
        })
        console.log("Paciente criado com sucesso!")
        return "Paciente criado com sucesso!"
    };

    async findAll(){
        return await this.repository.paciente.findMany();
    }

    async getPacienteById(id: string){
        const paciente = await this.repository.paciente.findUnique({
            where: {id}
        })

        if(!paciente){
           return new HttpException("Paciente não encontrado!", HttpStatus.NOT_FOUND)
        }

        return paciente;
    }

    async update(id: string, updatePacienteDto:UpdatePacienteDto){
        const pacientExists = await this.repository.paciente.findUnique({
            where: {id}
        })
        
        if(!pacientExists){
            return new HttpException("Paciente não encontrado", HttpStatus.NOT_FOUND)
        }

        await this.repository.paciente.update({
            where: {id},
            data: updatePacienteDto
        })

        return "Paciente atualizado com sucesso!"
    }

    async remove(id: string){
        const pacienteExists = await this.repository.paciente.findUnique(
            {
                where: {id}
            }
        )

        if(!pacienteExists){
            return new HttpException('Paciente não encontrado', HttpStatus.NOT_FOUND)
        }

        await this.repository.paciente.delete({
            where: {id}
        })
        return "Paciente excluído com sucesso!"
    }
}
