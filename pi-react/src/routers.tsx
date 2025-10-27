import { Routes, Route } from "react-router-dom";
import PaginaInicio from "./pages/PaginaInicio/HomeDeslogada/page";
import Cadastro_Aluno from "./pages/Cadastros/Perfil/Cadastro_Aluno/"
import CadastroInicialPage from "./pages/Admin/paginainicial";
// import RecoveryCodePage from "./pages/RecuperaSenha/Code";
// import NewPasswordPage from "./pages/RecuperaSenha/NovaSenha";
// import RecoveryPhonePage from "./pages/RecuperaSenha/TelefoneCode";
import LoginPage from "./pages/UserLogin";
import Calendario_Aluno from "./pages/Calendarios/Calendario_Aluno/page"
import Login from "./pages/Login/Login/page"
import Login_Funcionario from "./pages/Login/Login_Funcionario/page"
import Cadastro_Instrutor from "./pages/Cadastros/Perfil/Cadastro_Instrutor";
import HomeFuncionario from "./pages/PaginaInicio/Funcionario/page";
import AlterarSenha from "./pages/RecuperarSenha/AlterarSenha_3";
import RecebimentoCodigo from "./pages/RecuperarSenha/RecebimentoCodigo_2";
import RecuperacaoTelefone from "./pages/RecuperarSenha/RecuperacaoTelefone_1";
import Cadastro_Adm_Recep from "./pages/Cadastros/Perfil/Cadastro_RecepAdm";
import Calendario_Funcionari from "./pages/Calendarios/Calendario_Funcionario/page"
import Cadastro_Aula from "./pages/Cadastros/Aula/page"

function MainRoutes() {
    return (
        <Routes>
            {/* Rotas públicas ou acesso a todos */}
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/home/funcionario" element={<HomeFuncionario/>}/>

            {/* <Route path="/recupera-senha/code" element={<RecoveryCodePage />} />
            <Route path="/recupera-senha/" element={<RecoveryPhonePage />} /> 
            <Route path="/recupera-senha/nova-senha" element={<NewPasswordPage/>} /> */}

            <Route path="/recuperarsenha/AlterarSenha" element={<AlterarSenha/>} />
            <Route path="/recuperarsenha/RecebimentoCodigo" element={<RecebimentoCodigo />} />
            <Route path="/recuperarsenha/RecuperacaoTelefone" element={<RecuperacaoTelefone />} />

            
            <Route path="/cadastro/aluno" element={<Cadastro_Aluno />} />
            <Route path="/cadastro/instrutor" element={<Cadastro_Instrutor />} />
            <Route path="/cadastro/adm-recep" element={<Cadastro_Adm_Recep/>}/>
            <Route path="cadastro/aula" element={<Cadastro_Aula/>}/>

            <Route path="/admin/Home" element={<CadastroInicialPage />} />

            <Route path="/calendario/aluno" element={<Calendario_Aluno/>}/>
            <Route path="/funcionario/calendario" element={<Calendario_Funcionari/>}/>

            <Route path="/user/Login" element={<LoginPage />} />
            <Route path="/login/aluno" element={<Login/>}/>
            <Route path="/login/funcionario" element={<Login_Funcionario/>}/>
        </Routes>

        // {/* SÓ ADMIN LOGADO */}
        // <Route element={<PrivateRoute roleRequired="Admin"/>}>
        //         <Route path="/Cadastro_Funcionario" element={<Cadastro_Funcionario />}/>
        //         <Route path="/Revisao_Publicacoes" element={<Revisao_Publicacoes />}/> 
        //  </Route>
    );
}

export default MainRoutes;