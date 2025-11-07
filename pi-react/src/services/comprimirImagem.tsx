import imageCompression from "browser-image-compression";

export const comprimirImagem = async (
    file: File,
    maxSizeMB: number = 2,
    maxWidthOrHeight: number = 2024
): Promise< string > => {
    const options = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
        return base64 ;
    } catch (error) {
        console.error("Erro ao comprimir ou converter:", error);
        const fallbackBase64 = await imageCompression.getDataUrlFromFile(file);
        return  fallbackBase64;
    }
};
