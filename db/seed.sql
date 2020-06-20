create table users (
    id serial primary key,
    username varchar(30),
    password varchar(30),
    email text
)
create table samples (
    id serial primary key,
    name varchar(50),
    sample_key text,
    type_id int references type(id),
    genre_id int references genre(id),
    instrument int references instrument(id),
    sample_url text,
    sample_author int references users(id)
)
create table type (
    id serial primary key,
    sample_type text
)
create table instrument (
    id serial primary key, 
    instrument text
)
create table genre (
    id serial primary key, 
    genre text
)
create table samplePack (
    id serial primary key,
    name varchar(40)
)
create table samplePackContents (
    id serial primary key,
    sample_pack_id int references samplePack(id),
    sample_id int references samples(id)
)