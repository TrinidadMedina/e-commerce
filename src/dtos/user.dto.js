const UserDTO = class {
    constructor(email, username, address, age, number, image) {
        this.email = email;
        this.username = username;
        this.address = address;
        this.age = age;
        this.number = number;
        this.image = image;
    }
}

module.exports = UserDTO;