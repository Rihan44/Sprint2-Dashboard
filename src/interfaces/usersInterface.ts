export interface UsersInterface {
    _id?: string | undefined,
    name: string,
    email: string,
    photo?: string,
    employee_position: string,
    phone_number: string | number,
    hire_date: string,
    job_description: string,
    status: boolean,
    password_hash: string
}

export interface UsersInterfaceState {
    data: UsersInterface[],
    dataUser: UsersInterface,
    status: string,
    statusDelete: string,
    error: string | null | undefined | boolean
}

