
interface OptionsCategProfisProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Options_categprofis({ value, onChange }: OptionsCategProfisProps) {
  return (
    <div className="flex justify-start items-start flex-col gap-3 w-full">
      <label htmlFor="categ-profis" className="text-[1.2rem]">
        Categoria da profissão
      </label>

      <select
        id="categ-profis"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none text-[1.2rem] bg-[var(--input-background)] rounded-[7px] p-3 text-lg h-[50px] focus:border-none"
      >
        <option value="">Clique para selecionar</option>
        <option value="sem-profissao">Sem profissão</option>
        <option value="tecnologia">Tecnologia</option>
        <option value="administrativo">Administrativo</option>
        <option value="comercial">Comercial | Vendas</option>
        <option value="financeiro">Financeiro | Contábil</option>
        <option value="juridico">Jurídico</option>
        <option value="recursos-humanos">Recursos Humanos</option>
        <option value="marketing">Marketing | Publicidade</option>
        <option value="educacao">Educação | Ensino</option>
        <option value="saude">Saúde | Medicina</option>
        <option value="engenharia">Engenharia</option>
        <option value="industria">Indústria | Produção</option>
        <option value="logistica">Logística | Transporte</option>
        <option value="varejo">Varejo | Atendimento</option>
        <option value="construcao">Construção Civil</option>
        <option value="servicos-gerais">Serviços Gerais</option>
        <option value="alimentacao">Alimentação | Gastronomia</option>
        <option value="arte-cultura">Arte | Cultura | Design</option>
        <option value="seguranca">Segurança | Militar</option>
        <option value="agro">Agronegócio</option>
        <option value="ciencias">Ciências | Pesquisa</option>
        <option value="meio-ambiente">Meio Ambiente | Sustentabilidade</option>
        <option value="outros">Outros</option>
      </select>
    </div>
  );
}
