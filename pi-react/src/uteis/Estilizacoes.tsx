
interface Estilizacoes {
    titulo_principal: string;
    segundo_titulo_principal: string;
    titulo_segundario: string;
    container_main: string;
    estilizacao_input: string;
}

const Estilizacoes = {
    //texto
    titulo_principal: "text-[2.3rem] md:text-[2rem] font-bold text-[var(--destaque)] w-full",
    segundo_titulo_principal: "text-[1.8rem] :text-[1.5rem] font-bold text-[var(--destaque)]",
    titulo_segundario: "text-[1.7rem] md:text-[1.4rem] font-semibold text-[var(--foreground)]",

    //container
    container_main: "flex justify-start items-start flex-col gap-5 w-full h-full",

    //input
    estilizacao_input: 
    "bg-[var(--input-background)] rounded-[7px] p-3 text-lg h-[50px] focus:outline-none focus:ring-2 focus:ring-[var(--destaque)] "

}

export default Estilizacoes