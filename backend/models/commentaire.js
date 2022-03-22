class Commentaire {
    constructor(
        id,
        commentaires,
        date,
        user,
        publication
    ) {
        this.id = id;
        this.commentaires = commentaires;
        this.date = date;
        this.user = user;
        this.publication = publication
    }
}
module.exports = Commentaire