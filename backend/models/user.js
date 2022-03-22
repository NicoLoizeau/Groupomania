class User {
    constructor(
        id,
        nom,
        email,
        password,
        photo
    ) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.password = password;
        this.photo = photo
    }
}
module.exports = User