
export default async function submitForm(
    e: React.FormEvent<HTMLFormElement>, 
    list: {value: any; set: React.Dispatch<any>}[]) {
    e.preventDefault()

    const infosAluno = new FormData;

    list.forEach(f => {
    if (f.value && typeof f.value === "object" && !(f.value instanceof File)) {
        Object.entries(f.value).forEach(([key, arquivo]) => {
        if (arquivo instanceof File) infosAluno.append(key, arquivo);
        });
    } else {
        infosAluno.append(f.set.name.replace("set", "").toLowerCase(), f.value);
    }
    });

    console.log(list)
    console.log(FormData)

    list.forEach(f => f.set(f.value instanceof Object ? {} : ""));
}

