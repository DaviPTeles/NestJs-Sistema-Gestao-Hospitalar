import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Injectable()
export class MedicoService {
    constructor(private readonly repository:PrismaService){}

    async create(createMedicoDto:CreateMedicoDto){
        await this.repository.medico.create({
            data:{
                nome: createMedicoDto.nome,
                especialidade: createMedicoDto.especialidade,
                email: createMedicoDto.email,
                telefone: createMedicoDto.telefone
            }
        })
        return "Médico criado com sucesso!"
    }

    async findAll(){
        return this.repository.medico.findMany()
    }

    async getMedicosById(id: string){
        const medico = await this.repository.medico.findUnique({
            where: {id}
        })

        if(!medico){
            return new HttpException('Médico não encontrado!', HttpStatus.NOT_FOUND)
        }

        return medico;
    }

    async update(id: string, updateMedicoDto: UpdateMedicoDto){
        const medicoExists = await this.repository.medico.findUnique({
            where: {id}
        })

        if(!medicoExists){
            return new HttpException('Médico não encontrado!', HttpStatus.NOT_FOUND)
        }

        await this.repository.medico.update({
            where: {id},
            data: updateMedicoDto
        })
        return "Usuário atualizado com sucesso!"
    }

    async remove(id: string){
        const medicoexists = await this.repository.medico.findUnique({
            where: {id}
        })

        if(!medicoexists){
            return new HttpException("Médico Não Encontrado", HttpStatus.NOT_FOUND)
        }

        await this.repository.medico.delete({
            where: {id}
        })

        return "Médico exluído com sucesso"
    }
}
