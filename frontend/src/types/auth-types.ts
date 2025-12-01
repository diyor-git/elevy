export type SignUpDataTypes = {
    first_name: string,
    last_name: string,
    gender: string,
    email: string,
    password: string | undefined,
    birthDate: string | undefined,
}

export type SignInDataTypes = {
    email: string,
    password: string | undefined,
}

export type UserData = {
    first_name: string,
    last_name: string,
    gender: string,
    email: string,
    password: string | undefined,
    birthDate: string | undefined,
    phone?: number | undefined
    username?: string,
}