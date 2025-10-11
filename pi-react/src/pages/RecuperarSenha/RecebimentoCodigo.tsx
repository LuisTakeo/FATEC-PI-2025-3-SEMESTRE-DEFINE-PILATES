
export default function RecebimentoCodigo(){
    return(
        <>
        <main className="flex flex-col items-center justify-center flex-1 px-6 py-6">
            <img
            src="/envelope.png"
            alt="Envelope"
            className="w-32 h-32 object-contain mb-6"
            />

            <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-[#832965] mb-2">
                Digite seu e-mail
            </h2>
            <p className="text-black mb-6">
                Para receber o seu código de segurança
            </p>

            <input
                type="email"
                placeholder="Escreva seu e-mail"
                className="w-full bg-[#D9D9D9] px-4 py-3 rounded-md mb-4 focus:outline-none"
            />

            <button
                onClick={() => router.push("/recovery/code")}
                className="bg-[#CF94AA] text-white font-inter py-3 px-6 rounded-md hover:opacity-90 w-full"
            >
                Solicitar código
            </button>
            </div>
        </main>
        </>
    )
}