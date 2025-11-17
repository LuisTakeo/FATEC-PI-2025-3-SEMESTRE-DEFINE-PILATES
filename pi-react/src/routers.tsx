import { Routes, Route } from "react-router-dom";
// --- Importações de Rotas ---
import PaginaInicio from "./pages/PaginaInicio/HomeDeslogada/page";
import Cadastro_Aluno from "./pages/Cadastros/Perfil/Cadastro_Aluno";
import CadastroInicialPage from "./pages/Admin/paginainicial";
import LoginPage from "./pages/UserLogin";
import Calendario_Aluno from "./pages/Calendarios/Calendario_Aluno/page";
import Login from "./pages/Login/Login/page";
import Login_Funcionario from "./pages/Login/Login_Funcionario/page";
import Cadastro_Instrutor from "./pages/Cadastros/Perfil/Cadastro_Instrutor";
import HomeFuncionario from "./pages/PaginaInicio/Funcionario/page";
import AlterarSenha from "./pages/RecuperarSenha/AlterarSenha_3";
import RecebimentoCodigo from "./pages/RecuperarSenha/RecebimentoCodigo_2";
import RecuperacaoTelefone from "./pages/RecuperarSenha/RecuperacaoTelefone_1";
import Cadastro_Adm_Recep from "./pages/Cadastros/Perfil/Cadastro_RecepAdm";
import Calendario_Funcionario from "./pages/Calendarios/Calendario_Funcionario/page";
import Cadastro_Aula from "./pages/Cadastros/Aula/page";
import HomeAlunoPage from "./pages/Aluno/page";
import AdminUsuariosPage from "./pages/Admin/paginapesquisa";   

function MainRoutes() {
    return (
        <Routes>
            {/* ----------------------------------------------------------------- */}
            {/* ROTAS PÚBLICAS / HOME */}
            {/* ----------------------------------------------------------------- */}
            <Route path="/" element={<PaginaInicio />} />

            {/* ----------------------------------------------------------------- */}
            {/* ROTAS DE LOGIN */}
            {/* ----------------------------------------------------------------- */}
            <Route path="/user/Login" element={<LoginPage />} />
            <Route path="/login/aluno" element={<Login/>}/>
            <Route path="/login/funcionario" element={<Login_Funcionario/>}/>

            {/* ----------------------------------------------------------------- */}
            {/* ROTAS DE RECUPERAÇÃO DE SENHA */}
            {/* ----------------------------------------------------------------- */}
            <Route path="/recuperarsenha/RecuperacaoTelefone" element={<RecuperacaoTelefone />} />
            <Route path="/recuperarsenha/RecebimentoCodigo" element={<RecebimentoCodigo />} />
            <Route path="/recuperarsenha/AlterarSenha" element={<AlterarSenha/>} />

            {/* ----------------------------------------------------------------- */}
            {/* ROTAS DE CADASTRO */}
            {/* ----------------------------------------------------------------- */}
            <Route path="/cadastro/aluno" element={<Cadastro_Aluno />} />
            <Route path="/cadastro/instrutor" element={<Cadastro_Instrutor />} />
            <Route path="/cadastro/adm-recep" element={<Cadastro_Adm_Recep/>}/>
            <Route path="/cadastro/aula" element={<Cadastro_Aula/>}/>

            {/* ----------------------------------------------------------------- */}
            {/* ROTAS DO ALUNO */}
            {/* ----------------------------------------------------------------- */}
            <Route path="/aluno/home" element={<HomeAlunoPage/>}/>
            <Route path="/calendario/aluno" element={<Calendario_Aluno/>}/>

            {/* ----------------------------------------------------------------- */}
            {/* ROTAS DE FUNCIONÁRIO (INSTRUTOR/RECEPCIONISTA) */}
            {/* ----------------------------------------------------------------- */}
            <Route path="/home/funcionario" element={<HomeFuncionario/>}/>
            <Route path="/calendario/funcionario" element={<Calendario_Funcionario/>}/>

            {/* ----------------------------------------------------------------- */}
            {/* ROTAS DE ADMINISTRAÇÃO (Acesso Restrito) */}
            {/* ----------------------------------------------------------------- */}
            <Route path="/admin/Home" element={<CadastroInicialPage />} />
            
            {/*  ROTA PRINCIPAL: PESQUISA DE USUÁRIOS (ADM) */}
            <Route 
                path="/admin/pesquisa-usuarios" 
                element={<AdminUsuariosPage />} 
            />
            
            {/* Adicione sua PrivateRoute aqui, se for usar */}
        </Routes>
    );
}

export default MainRoutes;