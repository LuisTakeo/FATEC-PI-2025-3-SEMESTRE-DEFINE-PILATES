import Estilizacoes from "../../model/Estilizacoes";
import Input from "../Input/Input";

interface ContatoComplemProps {
  ativo: string;
  setAtivo: React.Dispatch<React.SetStateAction<string>>;
  observacoes: string;
  setObservacoes: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  outro_telefone: string;
  setOutro_telefone: React.Dispatch<React.SetStateAction<string>>;
  outro_DDD: string;
  setOutroDDD: React.Dispatch<React.SetStateAction<string>>;
}

export default function ContatoComplem({
  ativo, setAtivo,
  observacoes, setObservacoes,
  email, setEmail,
  outro_telefone, setOutro_telefone,
  outro_DDD, setOutroDDD
}: ContatoComplemProps) {

  return (
    <div id="contato-complementar" className="w-full my-8 flex flex-col gap-6">
      <h1 className={Estilizacoes.segundo_titulo_principal}>Contato complementar</h1>

      <div className="text-[1.5rem] flex flex-row gap-10 flex-wrap">
        <div>
          <input
            type="radio"
            id="desabilitado"
            value="desabilitado"
            onChange={() => setAtivo("")}
            checked={ativo === ""}
            className="scale-200 accent-[var(--destaque)]"
          />
          <label htmlFor="email_opcao" className="text-[1.2rem] pl-5">Nenhum</label>
        </div>

        <div>
          <input
            type="radio"
            id="email_opcao"
            name="email_opcao"
            value="email_opcao"
            onChange={() => setAtivo("email_opcao")}
            checked={ativo === "email_opcao"}
            className="scale-200 accent-[var(--destaque)]"
          />
          <label htmlFor="email_opcao" className="text-[1.2rem] pl-5">E-mail</label>
        </div>
        
        <div>
          <input
            type="radio"
            id="outro_telefone_opcao"
            name="outro_telefone_opcao"
            value="outro_telefone_opcao"
            onChange={() => setAtivo("outro_telefone_opcao")}
            checked={ativo === "outro_telefone_opcao"}
            className="scale-200 accent-[var(--destaque)]"
          />
          <label htmlFor="outro_telefone_opcao" className="text-[1.2rem] pl-5">Outro telefone</label>
        </div>
      </div>

      {/* seção email */}
      {ativo === "email_opcao" && (
        <div className="w-full flex flex-col gap-5">
          <Input
            id="email"
            label="E-mail"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setOutroDDD(""); setOutro_telefone("")}}
            type="email"
            placeholder="Digite o email"
          />
          <div className="flex flex-col gap-3 w-full">
            <h1 className="text-[1.2rem] font-semibold text-[var(--foreground)]">Observação</h1>
            <textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
              placeholder="Exemplo: Apenas vejo o e-mail aos finais de semana"
            />
          </div>
        </div>
      )}

      {/* seção telefone */}
      {ativo === "outro_telefone_opcao" && (
        <section className="flex flex-col gap-5 w-full">
          <div className="flex flex-row gap-5 w-full flex-wrap">
            <div className="w-1/5">
              <Input
                id="ddd"
                label="DDD"
                value={outro_DDD}
                onChange={(e) => {setOutroDDD(e.target.value); setEmail("")}}
                placeholder="DDD"
                maxLength={4}
              />
            </div>
            <div className="flex-1">
              <Input
                id="telefone"
                label="Telefone"
                value={outro_telefone}
                onChange={(e) => {setOutro_telefone(e.target.value); setEmail("")}}
                placeholder="Digite o telefone"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <h1 className="text-[1.2rem] font-semibold text-[var(--foreground)]">Observação</h1>
            <textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="border rounded-[5px] w-full h-40 px-5 py-3 text-[1.2rem] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--destaque)]"
              placeholder="Exemplo: Não respondo no WhatsApp à noite"
            />
          </div>

         
        </section>
      )}
    </div>
  );
}
