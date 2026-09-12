export interface Fact {
    createdAt?: string;
    deleted?: boolean;
    id: string;
    text: string;
    type: string;
    updatedAt?: string;
    upvotes?: number;
    used?: boolean;
    user?: string;
    userUpvoted?: boolean;
}
export interface FactLoadMatch {
    amount?: number;
    animal_type?: string;
    $action?: string;
    [action: string]: any;
}
export interface FactListMatch {
    amount?: number;
    animal_type?: string;
}
export interface User {
    createdAt?: string;
    email?: string;
    id: string;
    name?: Record<string, any>;
    updatedAt?: string;
}
export interface UserListMatch {
    createdAt?: string;
    email?: string;
    id?: string;
    name?: Record<string, any>;
    updatedAt?: string;
}
