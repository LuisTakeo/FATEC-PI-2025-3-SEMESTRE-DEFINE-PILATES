
import { dadosLogin } from "../../services/dadoslogin"
import { fetchAulasAluno } from "../../services/aula/puxar_aula_aluno"
import { fetchAulasFuncionario} from "../../services/aula/fetchAulasFuncionario"
import { fetchAulasInstrutor } from "../../services/aula/fetchAulasInstrutor"

export default async function separadorRequisicoes(){
    
    const acesso = await dadosLogin()
    
    if (!acesso || !acesso.user) {
        console.error("Erro: Dados de acesso não disponíveis");
        return null;
    }
    
    const cargo = acesso.user.type
    const id = acesso.user.id
    console.log("acesso: ", acesso);
    console.log(cargo)
    if (cargo === "Student"){
        const aulas = await fetchAulasAluno(id.toString())
        return {aulas, cargo, id}
    }else if (cargo === "Instructor"){
        const aulas = await fetchAulasInstrutor(id)
        return {aulas, cargo, id}
    }else{
        const aulas = await fetchAulasFuncionario()
        return {aulas, cargo, id}
    }
    
}