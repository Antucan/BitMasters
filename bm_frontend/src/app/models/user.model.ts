export class User {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public phone: number,
        public email: string,
        public password: string,
        public role: string,
    ) { }
    get infoLogin(){
        return {
            email: this.email,
            password: this.password
        }
    }
}
