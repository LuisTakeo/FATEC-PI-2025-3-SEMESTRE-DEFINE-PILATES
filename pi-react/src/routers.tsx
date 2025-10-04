import { Routes, Route } from "react-router-dom";
import PaginaInicio from "./pages/PaginaInicio/index";
import Cadastro_Aluno from "./pages/Cadastros/Cadastro_Aluno/"

function MainRoutes() {
    return (
        <Routes>
            {/* Rotas públicas ou acesso a todos */}
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/Cadastro_Aluno" element={<Cadastro_Aluno />} />
        </Routes>

        // {/* SÓ ADMIN LOGADO */}
        // <Route element={<PrivateRoute roleRequired="Admin"/>}>
        //         <Route path="/Cadastro_Funcionario" element={<Cadastro_Funcionario />}/>
        //         <Route path="/Revisao_Publicacoes" element={<Revisao_Publicacoes />}/> 
        //  </Route>
    );
}

export default MainRoutes;