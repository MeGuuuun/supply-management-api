-- uuid-ossp 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE table if not exists category (
    category_id UUID primary key,
    name varchar,
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO category VALUES (uuid_generate_v4(), '학용품');
INSERT INTO category VALUES (uuid_generate_v4(), '욕실용품');

CREATE table if not exists supply (
    supply_id UUID primary key,
    name varchar,
    quantity int,
    status varchar DEFAULT '사용 가능',
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    category_id UUID,
    Foreign Key (category_id) references category(category_id)
);

INSERT INTO supply (supply_id, name, quantity, category_id)
VALUES (uuid_generate_v4(), '연필', 10, (SELECT category_id FROM category WHERE name='학용품' LIMIT 1));

INSERT INTO supply (supply_id, name, quantity, category_id)
VALUES (uuid_generate_v4(), '공책', 25, (SELECT category_id FROM category WHERE name='학용품' LIMIT 1));

INSERT INTO supply (supply_id, name, quantity, category_id)
VALUES (uuid_generate_v4(), '비누', 5, (SELECT category_id FROM category WHERE name='욕실용품' LIMIT 1));

INSERT INTO supply (supply_id, name, quantity, category_id)
VALUES (uuid_generate_v4(), '치약', 10, (SELECT category_id FROM category WHERE name='욕실용품' LIMIT 1));