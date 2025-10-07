import "./styles.Footer.css"
import { Link } from "react-router-dom";

function Footer(){
    return(
    <footer className="text-black-600 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <a className="text-bold flex order-first lg:order-none lg:w-1/5 italiana-regular text-[var(--destaque)] lg:items-center lg:justify-center mb-4 md:mb-0"
                >
                <span className="ml-0 text-[2rem] pl-8">Define Pilates</span>
                </a>
            </a>
            <p className="mt-2 text-sm text-gray-700">Pilates é para você: construa força, aumente sua flexibilidade e domine sua energia</p>
            </div>

            <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first pr-10">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">PÁGINAS</h2>
                <nav className="list-none mb-10 flex flex-col gap-y-5">
                <li>
                    <Link to="/PaginaInicio" className="text-gray-600 hover:text-gray-800">
                        Página Inicial
                    </Link>
                </li>
                <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                    Calendário
                </Link>
                </li>
                <li>
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                    Perfil pessoal
                </Link>
                </li>
                <li>
                <Link to="" className="text-gray-600 hover:text-gray-800">
                    Consultar plano
                </Link>
                </li>
                </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ENDEREÇOS</h2>
                <nav className="list-none mb-10 flex flex-col gap-y-5">
                <li>
                    <a className="text-gray-600 hover:text-gray-800">
                        <strong>Unidade 1</strong><br/>Rua José Aldo Piassa, 165<br/>São Miguel Paulista
                    </a>
                </li>
                <li>
                    <a className="text-gray-600 hover:text-gray-800">
                        <strong>Unidade 2</strong><br/>Rua José Aldo Piassa, 165<br/>São Miguel Paulista
                    </a>
                </li>
                <li>
                    <a className="text-gray-600 hover:text-gray-800">
                        <strong>Unidade 3</strong><br/>Rua José Aldo Piassa, 165<br/>São Miguel Paulista
                    </a>
                </li>

                </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CONTATOS</h2>
                <nav className="list-none mb-10 flex flex-col gap-y-5">
                <li>
                    <a className="text-gray-600 hover:text-gray-800" href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F5511941424166%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAac_M8GRzr2tOwWjzF_sFJ6o6C7O88TUXjjtz0NmQwsMLQgU8BrTNIo6NW0ABw_aem_Vtyy7ZGSwovfayBCBKUNcw&e=AT2kNj1QmZpXGVK9cn0t3PhzQ2KTx92QQs_r8qRtaK7JFr-bY1YxPoTctB5Zp6SbOqGUNVQ6x2yL1wI_0PhkzjXx4Efr84OCT8UZMzEJYg" target="_blank">WhatsApp</a>
                </li>
                <li>
                    <a className="text-gray-600 hover:text-gray-800" href="https://www.instagram.com/define.pilates/" target="_blank">Instagram</a>
                </li>
                <li>
                    <a className="text-gray-600 hover:text-gray-800" href="https://www.facebook.com/pilates.define/" target="_blank">Facebook</a>
                </li>
                </nav>
            </div>
            </div>
        </div>
        <div className="bg-[var(--destaque)]">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-[var(--background)] text-sm text-center sm:text-left">© 2025 —
                <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-[var(--background)] ml-1" target="_blank">@define.pilates</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <a className="text-[var(--background)]" href="https://www.facebook.com/pilates.define/">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
                </a>
                <a className="ml-6 text-[var(--background)]" href="https://www.instagram.com/define.pilates/">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
                </a>
                <a className="ml-6 text-[var(--background)] [&>svg]:h-5 [&>svg]:w-5" href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F5511941424166%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAac_M8GRzr2tOwWjzF_sFJ6o6C7O88TUXjjtz0NmQwsMLQgU8BrTNIo6NW0ABw_aem_Vtyy7ZGSwovfayBCBKUNcw&e=AT2kNj1QmZpXGVK9cn0t3PhzQ2KTx92QQs_r8qRtaK7JFr-bY1YxPoTctB5Zp6SbOqGUNVQ6x2yL1wI_0PhkzjXx4Efr84OCT8UZMzEJYg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512">
                    <path
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                </a>
            </span>
            </div>
        </div>
        </footer>
    )
}

export default Footer;