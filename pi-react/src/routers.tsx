import { Routes, Route } from "react-router-dom";
import PaginaInicio from "./pages/PaginaInicio/index";
import Cadastro_Aluno from "./pages/Cadastros/Cadastro_Aluno/"
import CadastroInicialPage from "./pages/Admin/paginainicial";
import RecoveryCodePage from "./pages/RecuperaSenha/Code";
import NewPasswordPage from "./pages/RecuperaSenha/NovaSenha";
import RecoveryPhonePage from "./pages/RecuperaSenha/TelefoneCode";
import LoginPage from "./pages/UserLogin";
import Cadastro_Instrutor from "./pages/Cadastros/Cadastro_Instrutor";

function MainRoutes() {
    return (
        <Routes>
            {/* Rotas públicas ou acesso a todos */}
            <Route path="/admin/Home" element={<CadastroInicialPage />} />
            <Route path="/recupera-senha/code" element={<RecoveryCodePage />} />
            <Route path="/recupera-senha/" element={<RecoveryPhonePage />} /> 
            <Route path="/recupera-senha/nova-senha" element={<NewPasswordPage/>} />
            <Route path="/user/Login" element={<LoginPage />} />
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/Cadastro_Aluno" element={<Cadastro_Aluno />} />
            <Route path="/Cadastro_Instrutor" element={<Cadastro_Instrutor />} />
        </Routes>

        // {/* SÓ ADMIN LOGADO */}
        // <Route element={<PrivateRoute roleRequired="Admin"/>}>
        //         <Route path="/Cadastro_Funcionario" element={<Cadastro_Funcionario />}/>
        //         <Route path="/Revisao_Publicacoes" element={<Revisao_Publicacoes />}/> 
        //  </Route>
    );
}

export default MainRoutes;