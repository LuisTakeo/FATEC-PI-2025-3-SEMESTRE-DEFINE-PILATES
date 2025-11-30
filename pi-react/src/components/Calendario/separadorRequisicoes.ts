
import { dadosLogin } from "../../services/dadoslogin"
import { fetchAulasAluno } from "../../services/aula/puxar_aula_aluno"
import { fetchAulasFuncionario} from "../../services/aula/fetchAulasFuncionario"

 export default async function separadorRequisicoes(){
    
    const acesso = await dadosLogin()
    const cargo = acesso.user.type
    const id = acesso.user.id


    if (cargo == "student"){
        const aulas = await fetchAulasAluno(id)
        return {aulas, cargo, id}
    }else if (cargo == "instructor"){
        const aulas = (await fetchAulasFuncionario())
        .filter(aulas => aulas.id === id)
        return {aulas, cargo, id}
    }else{
        const aulas = await fetchAulasFuncionario()
        return {aulas, cargo, id}
    }
    
}