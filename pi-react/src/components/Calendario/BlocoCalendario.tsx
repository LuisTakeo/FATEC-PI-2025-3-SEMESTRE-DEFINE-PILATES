import type { Filtros } from "../../types/Filtros";
import type { Aula } from "../../types/Aula";


interface BlocoCalendarioProps {
  filtros: Filtros;
  aulas: Aula[]; // <- adicione essa linha
}

export default function BlocoCalendario({ filtros, aulas }: BlocoCalendarioProps) {
  return (
    <div>
      {aulas.map((aula) => (
        <div key={aula.id}>
          <p>{aula.unidade} - {aula.instrutor}</p>
          <p>{aula.data} | {aula.horario.inicio} - {aula.horario.fim}</p>
        </div>
      ))}
    </div>
  );
}

