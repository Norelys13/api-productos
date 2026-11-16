CREATE DATABASE tiendaperu;
use tiendaperu;

create table if not exists productos
(
	id int unsigned not null auto_increment primary key,
    marca varchar(100) not null,
    descripcion  varchar(200) not null,
    precio decimal(10,2) not null,
    stock int unsigned not null default 0,
    create_at datetime not null default now(),
    update_at datetime null
)engine = INNODB;

insert into productos
	(marca, descripcion, precio, stock)
    values
    ('Samsung', 'TV 55', 2500, 10),
    ('LG', 'Lavadora', 1200, 3),
    ('Sony', 'Playstation 5', 3200, 2);
    
select * from productos;


create table if not exists clientes
(
	id int unsigned not null auto_increment primary key,
    apellidos varchar(100) not null,
    nombres varchar(100) not null,
    telefono varchar(15) null,
    direccion varchar(200) null,
    email varchar(100) not null unique,
    create_at datetime not null default now(),
    updated_at datetime null
)engine = INNODB;

insert into clientes
	(apellidos, nombres, telefono, direccion, email)
    values
    ('Quispe Huamán', 'Carlos Alberto', '956123456', 'Av. Grau 450, Ica', 'carlos.quispe@gmail.com'),
    ('Ramos Flores', 'María Elena', '987654321', 'Calle Lima 123, Chincha', 'maria.ramos@gmail.com'),
    ('Torres Vega', 'José Luis', '945789012', 'Jr. Bolognesi 78, Pisco', 'jose.torres@hotmail.com');

select * from clientes;


create table if not exists proveedores
(
	id int unsigned not null auto_increment primary key,
    razonsocial varchar(150) not null,
    contacto varchar(100) not null,
    ruc char(11) not null unique,
    direccion varchar(200) null,
    create_at datetime not null default now(),
    updated_at datetime null
)engine = INNODB;

insert into proveedores
	(razonsocial, contacto, ruc, direccion)
    values
    ('Samsung Electronics Perú S.A.C.', 'Luis Mendoza', '20509876541', 'Av. Javier Prado Este 4200, Lima'),
    ('LG Electronics Perú S.A.', 'Ana Paredes', '20512345678', 'Av. República de Panamá 3030, Lima'),
    ('Sony Perú S.A.C.', 'Jorge Castillo', '20498765432', 'Av. Benavides 1555, Lima');

select * from proveedores;
