import { Advertisement } from './advertisement.interface';

export interface User {
    id?: number;
    name: string;
    password: string;
    email: string;
    role: string;
    appliedFor?: Advertisement[];
    acceptedFor?: Advertisement[];
}