export type UserRole = "ADMIN" | "USER";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    created_at: Date;
}