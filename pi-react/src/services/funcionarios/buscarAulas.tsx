const aulasDoDiaIndisponiveisMock = [
    {
        id: 1,
        horario: "08:00",
        instrutor:{ id: 1, nome: "Carlos Silva" }
    },
    {
        id: 2,
        horario: "10:00",
        instrutor:{ id: 2, nome: "Ana Souza" }
    },
]


const horariosFormularioMock = [
    "06:00", "07:00", "08:00", "09:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00",
];

const horariosDisponiveis = horariosFormularioMock
        .filter(horario =>
            !aulasDoDiaIndisponiveisMock.find(aula => 
                aula.horario === horario
            ) 
        );
console.log("Horários disponíveis:", horariosDisponiveis);

// me faça um elemento html que exiba os horários disponíveis em uma lista não ordenada.
export function HorariosDisponiveisList() {
    return (
        <div>
            <h2>Horários Disponíveis</h2>
            <ul>
                {horariosDisponiveis.map((horario, index) => (

                    <li key={index}>{horario}</li>


                ))}
            </ul>
        </div>
    );
}

