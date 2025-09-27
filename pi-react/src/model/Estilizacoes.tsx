
interface Estilizacoes {
    titulo_principal: string;
    segundo_titulo_principal: string;
    titulo_segundario: string;
    container_main: string;
}

const Estilizacoes = {
    //texto
    titulo_principal: "text-[2rem] font-bold text-[var(--destaque)]",
    segundo_titulo_principal: "text-[1.5rem] font-bold text-[var(--destaque)]",
    titulo_segundario: "text-[1.3rem] font-semibold text-[var(--foreground)]",

    //container
    container_main: "flex justify-start items-start flex-col gap-5 w-full h-full"
}

export default Estilizacoes