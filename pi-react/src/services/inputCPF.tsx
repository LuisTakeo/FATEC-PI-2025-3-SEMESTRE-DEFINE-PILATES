export default function inputCPF(valor: string){

    let cpf: string = valor.replace(/\D/g, "").slice(0, 11)

    if (cpf.length >= 3 && cpf.length <= 6){
        return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (cpf.length >= 6 && cpf.length <= 9) {
        return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (cpf.length >= 9 && cpf.length <= 11){
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }
    return cpf
};



