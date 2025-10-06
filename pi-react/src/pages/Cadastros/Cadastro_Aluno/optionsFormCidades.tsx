// reutilizar

function OptionsFormCidades(){
    return(
        <div className="flex justify-start items-start flex-col gap-3  w-full">
            <label htmlFor="categ-profis" className="text-[1.2rem]">
                Cidade
            </label>
            <select name="" id="categ-profis" className="w-full  appearance-none text-[1.2rem] bg-[var(--input-background)] rounded-[7px] p-3 text-lg h-[50px] focus:border-none">
                <option disabled selected>Clique para selecionar</option>
                <option value="outros">São Paulo</option>
                <option value="outros">São Miguel Paulista</option>
                <option value="outros">Outras</option>
            </select>
        </div>
    )
}

export default OptionsFormCidades;