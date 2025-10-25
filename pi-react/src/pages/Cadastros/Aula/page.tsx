import { useNavigate } from "react-router-dom";
import Botao from "./../../../components/Botao/Botao"
import Input from "./../../../components/Input/Input"

export default function Cadastro_Aula(){

  const navigate = useNavigate();

    return(
        <main className="w-full h-full flex flex-col px-[15%]">
            <header className="w-full h-full flex flex-row">
                <div className="w-full text-[2rem] font-semibold">
                    <h1>Cadastrar aula</h1>
                </div>
                <div className="w-full">
                    <Botao texto="Voltar a página anterior" type="button" onClick={() => navigate(-1)}/>
                </div>
            </header>
            <form action="">
                
            </form>
        </main>
    )
}