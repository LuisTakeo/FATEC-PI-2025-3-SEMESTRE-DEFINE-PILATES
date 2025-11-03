import { useState } from "react";
import Estilizacoes from "../../model/Estilizacoes";
import Input from "./../Input/Input";


interface ContatoComplemProps {
    cepComplementar: string;
    setCEPComplementar: React.Dispatch<React.SetStateAction<string>>;
    ruaComplementar: string;
    setRuaComplementar: React.Dispatch<React.SetStateAction<string>>;
    numeroComplementar: string;
    setNumeroComplementar: React.Dispatch<React.SetStateAction<string>>;
    bairroComplementar: string;
    setBairroComplementar: React.Dispatch<React.SetStateAction<string>>;
    complementoComplementar: string;
    setComplementoComplementar: React.Dispatch<React.SetStateAction<string>>
    isPrincipal: boolean;
    setIsPrincipal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OutroEndereco({
    cepComplementar, setCEPComplementar,
    ruaComplementar, setRuaComplementar,
    numeroComplementar, setNumeroComplementar,
    bairroComplementar, setBairroComplementar,
    complementoComplementar, setComplementoComplementar,
    isPrincipal, setIsPrincipal
}: ContatoComplemProps) {

  const [ativoComplementar, setAtivoComplementar] = useState(false)

  return (
    <div id="endereco-complementar" className="w-full my-11 flex flex-col gap-6">
      <div className="text-[1.5rem] flex flex-row gap-10 flex-wrap">
          <div className="flex gap-8 items-center justify-center">
              <div>
                  <h1 className={Estilizacoes.titulo_segundario}>Adicionar outro endereço</h1>
              </div>
              <div>
                  <button
                  type="button"
                  className={`flex items-center justify-center 
                  w-[50px] h-full rounded-full text-[2rem] text-white  cursor-pointer
                  ${!ativoComplementar ? "bg-[var(--azul-segundario)]" : "bg-[var(--destaque)]"}`}
                  onClick={() => setAtivoComplementar(!ativoComplementar)}
                  >+</button>
              </div>
          </div>
        </div> 

        {ativoComplementar && (
          <section id="endereço" className="flex justify-start items-start flex-col gap-5 mt-5">
            <div>
                <h1 className={Estilizacoes.segundo_titulo_principal}>Outro endereço</h1>
            </div>

            {/* aplicar api */}
            <div className="w-full">
                <Input
                    id="cep"
                    label="CEP"
                    value={cepComplementar}
                    onChange={(e) => setCEPComplementar(e.target.value)}
                    type = "text"
                    pattern="[-0-9]+"
                    placeholder = "CEP"
                    
                    maxLength={8}
                />
            </div>

            <div className="flex justify-start items-start w-full gap-4">
                <div className="w-[75%]">
                    <Input
                        id="rua"
                        label="Rua"
                        value={ruaComplementar}
                        onChange={(e) => setRuaComplementar(e.target.value)}
                        type = "text"
                        pattern=".*"
                        placeholder = "Digite a Rua"
                        
                    />
                </div>

                <div className="w-[25%]">
                    <Input
                        id="numero"
                        label="Número"
                        value={numeroComplementar}
                        onChange={(e) => setNumeroComplementar(e.target.value)}
                        type = "text"
                        pattern=".*"
                        placeholder = "Número"
                        
                    />
                </div>
            </div>

            <div className="w-full">
                <Input
                    id="bairro"
                    label="Bairro"
                    value={bairroComplementar}
                    onChange={(e) => setBairroComplementar(e.target.value)}
                    type = "text"
                    pattern=".*"
                    placeholder = "Digite o Bairro"
                    
                />
            </div>

            <div className="w-full">
                <Input
                    id="complemento"
                    label="Complemento"
                    value={complementoComplementar}
                    onChange={(e) => setComplementoComplementar(e.target.value)}
                    type = "text"
                    pattern=".*"
                    placeholder = "Ex: Apartamento 156"
                    
                />
            </div>

            <div className="flex flex-row gap-6 w-full justify-start my-8">
              <h1 className="text-[1.2rem] font-semibold text-[var(--foreground)]">Este endereço é principal?</h1>
              <div className="mx-5">
              <input
                  type="radio"
                  id="isPrincipal_true"
                  name="isPrincipal"
                  onClick={() => setIsPrincipal(true)}
                  checked={isPrincipal === true}
                  className="scale-200 accent-[var(--destaque)]"
              />
              <label htmlFor="isPrincipal_true" className="text-[1.2rem] pl-5">Sim</label>
              </div>
              <div className="mx-5">
              <input
                  type="radio"
                  id="isPrincipal_false"
                  name="isPrincipal"
                  onClick={() => setIsPrincipal(false)}
                  checked={isPrincipal === false}
                  className="scale-200 accent-[var(--destaque)]"
              />
              <label htmlFor="isPrincipal_false" className="text-[1.2rem] pl-5">Não</label>
              </div>
            </div>

      </section>
        )}
      
    </div>
        
  );
}
