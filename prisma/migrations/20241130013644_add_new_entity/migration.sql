-- CreateTable
CREATE TABLE "Consulta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "medicoId" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
