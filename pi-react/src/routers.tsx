import { Routes, Route } from "react-router-dom";
import PaginaInicio from "./pages/PaginaInicio/index";
import Cadastro_Aluno from "./pages/Cadastros/Cadastro_Aluno/"
import Calendario_Aluno from "./pages/Calendarios/Calendario_Aluno/page"
import LoginPage from "./pages/Login/Login/page"
import Login_Funcionario from "./pages/Login/Login_Funcionario/page"

function MainRoutes() {
    return (
        <Routes>
            {/* Rotas públicas ou acesso a todos */}
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/cadastro/aluno" element={<Cadastro_Aluno />} />

            <Route path="/calendario/aluno" element={<Calendario_Aluno/>}/>

            <Route path="/login/aluno" element={<LoginPage/>}/>
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