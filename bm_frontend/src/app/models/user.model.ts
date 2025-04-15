export class User {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public phone: number,
        public mail: string,
        public password: string,
        public role: number,
    ) { }
    get infoLogin(){
        return {
            mail: this.mail,
            password: this.password
        }
    }
}
