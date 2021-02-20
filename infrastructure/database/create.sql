CREATE SCHEMA my_schema;

ALTER SCHEMA my_schema OWNER TO postgres;

CREATE TABLE my_schema.users (
  id serial not null primary key,
  username text not null,
  password text not null
);

CREATE TABLE my_schema.groups (
  id serial not null primary key,
  username text not null,
  password text not null
);

CREATE TABLE my_schema.group_users (
  group_id int not null,
  user_id int not null,
  primary key (group_id, user_id),
  foreign key (group_id) references my_schema.groups (id)
    on update cascade on delete restrict,
  foreign key (user_id) references my_schema.users (id)
    on update cascade on delete restrict
);

CREATE TABLE my_schema.messages (
  id serial not null,
  body text not null,
  created_at timestamp with time zone not null,
  created_by int not null,
  foreign key (created_by) references my_schema.users (id)
    on update cascade on delete cascade
);
