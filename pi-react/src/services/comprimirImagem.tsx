import imageCompression from "browser-image-compression";
// npm install browser-image-compression

export const comprimirImagem = async (
    file: File,
    maxSizeMB: number = 2,
    maxWidthOrHeight: number = 2024
): Promise<File> => {
    const options = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true,
    }

    try {
        const compressedFile = await imageCompression(file, options);
        console.log(compressedFile);
        return compressedFile;
    } catch (error){
        console.error("Erro: ", error)
        return file;
    }
}