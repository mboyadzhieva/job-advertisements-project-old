import { User } from './auth/user.model';

export interface Advertisement {
    id?: number;
    title: string;
    description: string;
    likes?: number;
    type: string;
    category: string;
    imageUrl: string;
    appliedUsers?: User[];
}
