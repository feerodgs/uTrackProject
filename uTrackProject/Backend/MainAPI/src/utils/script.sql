create database utrack;

use utrack;

create table usuario (
    id integer auto_increment primary key,
    email varchar(255) not null
);

create table track (
    id integer auto_increment primary key,
    nome_produto varchar(255),
    data_previsao date, 
    codigo_rastreio varchar(255) not null,
    codigo_usuario integer not null,
    foreign key (codigo_usuario) references usuario(id)
);