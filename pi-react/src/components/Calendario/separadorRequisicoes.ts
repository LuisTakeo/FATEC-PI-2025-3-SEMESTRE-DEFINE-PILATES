
import { dadosLogin } from "../../services/dadoslogin"
import { fetchAulasAluno } from "../../services/aula/puxar_aula_aluno"
import { fetchAulasFuncionario} from "../../services/aula/puxar_aula_funcionario"

 export default async function separadorRequisicoes(){
    
    const acesso = await dadosLogin()
    const cargo = acesso.user.type
    const id = acesso.user.id


    if (cargo == "student"){
        const aulas = await fetchAulasAluno(id)
        return {aulas, cargo}
    }else if (cargo == "instructor"){
        const aulas = (await fetchAulasFuncionario())
        .filter(aulas => aulas.id === id)
        return {aulas, cargo}
    }else{
        const aulas = await fetchAulasFuncionario()
        return {aulas, cargo}
    }
    
}