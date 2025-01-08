export class RugCheckApi {
    public readonly baseUrl = "https://api.rugcheck.xyz/v1";

    constructor(private readonly jwtToken?: string) {}

    async makeRequest(endpoint: string, options: RequestInit = {}) {
        const headers: Record<string, string> = {
            ...(options.headers as Record<string, string>),
            "Content-Type": "application/json",
        };

        if (this.jwtToken) {
            headers.Authorization = `Bearer ${this.jwtToken}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("RugCheck API rate limit exceeded");
            }
            throw new Error(`RugCheck API request failed: ${response.statusText}`);
        }

        return await response.json();
    }
}