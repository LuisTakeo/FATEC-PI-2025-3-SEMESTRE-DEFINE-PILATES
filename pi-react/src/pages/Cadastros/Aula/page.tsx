import { useNavigate } from "react-router-dom";
import Botao from "./../../../components/Botao/Botao"

export default function Cadastro_Aula(){

  const navigate = useNavigate();

    return(
        <main>
            <header>
                <div>
                    <h1>Cadastrar aula</h1>
                </div>
                <div className="w-full">
                    <Botao texto="Voltar a página anterior" type="button" onClick={() => navigate(-1)}/>
                </div>
            </header>
        </main>
    )
}