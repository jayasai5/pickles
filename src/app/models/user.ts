
export interface User {
    uid: string;
    email: string;
    roles: Roles;
}
export interface Roles {
    admin: boolean;
    customer: boolean;
}
