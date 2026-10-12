const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getTrazasanPlatformStatus(): Promise<number> {
    if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL no está configurada");
    }

    const response = await fetch(`${apiUrl}/api/v1/status`);

    return response.status;
}