export class User {
    id: number;
    name: string;
    surname: string;
    phone: string;
    mail: string;
    password: string;
    role: number;
    constructor(id: number, name: string, surname: string, phone: string, mail: string, password: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.mail = mail;
        this.password = password;
        this.role = 2;
    }
}
