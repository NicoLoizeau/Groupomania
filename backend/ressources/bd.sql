create database groupomaniaDb;

use groupomaniaDb;

create table user(
    id int(10) primary key auto_increment,
    nom varchar(50),
    email varchar(50) not null unique,
    password varchar(20),
    photo varchar(50)
)

create table publication(
    id int(10)primary key auto_increment,
    titre varchar(50),
    description varchar(255),
    image varchar(50),
    date datetime,
    user int(10),
    foreign key(user) references user(id)
)

create table commentaires(
    id int(10) primary key auto_increment,
    commentaires varchar(255),
    date datetime,
    user int(10),
    publication int(10),
    foreign key(user) references user(id),
    foreign key(publication) references publication(id)
)