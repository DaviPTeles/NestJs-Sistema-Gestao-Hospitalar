import { Module } from '@nestjs/common';
import { ConsultaController } from './consulta.controller';
import { ConsultaService } from './consulta.service';
import { MedicoModule } from 'src/medico/medico.module';
import { PacienteModule } from 'src/paciente/paciente.module';

@Module({
  imports:[MedicoModule, PacienteModule],
  controllers: [ConsultaController],
  providers: [ConsultaService]
})
export class ConsultaModule {}
