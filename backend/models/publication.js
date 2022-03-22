class Publication {
    constructor(
        id,
        titre,
        description,
        image,
        date,
        user
    ) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.image = image;
        this.date = date;
        this.user = user
    }
}
module.exports = Publication