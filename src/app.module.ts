import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';
import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { ConsultaModule } from './consulta/consulta.module';

@Module({
  imports: [RepositoryModule, PacienteModule, MedicoModule, ConsultaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
