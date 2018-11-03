
export interface User {
    uid: string;
    email: string;
    roles: Roles;
}
export interface Roles {
    visitor: boolean;
    admin?: boolean;
    customer?: boolean;
}
