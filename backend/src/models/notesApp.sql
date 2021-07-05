CREATE DATABASE `notes_app`;

USE `notes_app`;

create table `usuarios`(
    `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(25) not null,
    `contrasena` varchar(60) not null,
    primary key(`idUsuario`)
) 

create table `notas`(
    `idNota` int(11) not null AUTO_INCREMENT,
    `titulo` varchar(150) not null,
    `descripcion` text,
    `created_at` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
    `idUsuario` int(11) default null,
    PRIMARY KEY (`idNota`),
    KEY `fk_user_idx` (`idUsuario`),
    CONSTRAINT `fk_user` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON UPDATE CASCADE
)