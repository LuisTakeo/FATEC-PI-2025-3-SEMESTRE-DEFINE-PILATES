"use client";

import Link from "next/link";
import "./style.css"
export default function Header() {
  return (
    <header>
      <nav className="nav-bar">
          <div className="container-left">

            <button
              className="button-voltar"
              type="button"
              onClick={() => window.history.back()}
            >
              <img src="" alt="" />
              <h1>Voltar</h1>
            </button>

            <Link href="/" className="button-pag-inicial">
              <h1>Página inicial</h1>
            </Link>

          </div>
          <div className="container-right">
            <div className="logo-container-right">
              <h1>Define Pilates</h1>
            </div>
          </div>
      </nav>
    </header>
  );
}