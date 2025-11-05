import { API_BASE_URL } from "../config/api";

interface InstructorPayload {
    name: string;
    password: string;
    phone: string;
    birth_date: string;
    hiring: string;
    classification: string;
    cref: string;
    crefito: string;
    fulladdress: string;
}

// const API_URL = `${import.meta.env.VITE_API_URL}/instructors/save`;

export const registerInstructor = async (payload: InstructorPayload) => {
    const response = await fetch(`${API_BASE_URL}/instructors/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
        throw { status: response.status, ...result };
    }

    return result;
};