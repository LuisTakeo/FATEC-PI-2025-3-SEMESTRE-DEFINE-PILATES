// import { Outlet } from "react-router-dom";

// function PrivateRoute({ roleRequired }) {
//     const isLogado = localStorage.getItem("Logado") === "true";
//     const isAdmin = localStorage.getItem("Cargo").toLowerCase() === "admin";
//     const isFuncionario = localStorage.getItem("Cargo") === "Funcionario";

//     let permissao = false;

//     if (!isLogado) {
//         permissao = false;
//     } else if (roleRequired?.toLowerCase() === "admin") {
//         permissao = isAdmin;
//     } else {
//         permissao = isLogado && (isAdmin || isFuncionario);
//     }

//     if (permissao) {
//         return <Outlet />;
//     } else {
//         return (
//             <div>
//                 <h1>Você não tem permissão para acessar esta página. Caso isso seja um erro, por favor entre em contato com a empresa.</h1>
//             </div>
//         );
//     }
// }

// export default PrivateRoute;