
export default function AlterarSenha(){
    return(
        <>
        <main className="flex flex-col items-center justify-center flex-1 px-6 py-6">
            <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-[#832965] mb-2">
                Escreva sua nova senha
            </h2>
            <p className="text-black mb-6 font-inter">
                A senha deve ter caracteres <b>maiúsculos</b>, <b>minúsculos</b> e{" "}
                <b>número</b>
            </p>

            <input
                type="password"
                placeholder="Nova senha"
                className="w-full bg-[#D9D9D9] px-4 py-3 rounded-md mb-4 focus:outline-none"
            />
            <input
                type="password"
                placeholder="Escreva a nova senha novamente"
                className="w-full bg-[#D9D9D9] px-4 py-3 rounded-md mb-4 focus:outline-none"
            />

            <button
                onClick={() => router.push("/login")}
                className="bg-[#CF94AA] text-white font-inter py-3 px-6 rounded-md hover:opacity-90 w-full"
            >
                Finalizar
            </button>
            </div>
        </main>
        </>
    )
}