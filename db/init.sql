-- uuid-ossp 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE table if not exists member (
    member_id UUID primary key DEFAULT uuid_generate_v4() ,
    name varchar,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO member VALUES (uuid_generate_v4(),'관리자');
INSERT INTO member VALUES (uuid_generate_v4(),'사용자1');
INSERT INTO member VALUES (uuid_generate_v4(),'사용자2');

CREATE table if not exists category (
    category_id UUID primary key DEFAULT uuid_generate_v4(),
    name varchar,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO category VALUES (uuid_generate_v4(), '사무용품');
INSERT INTO category VALUES (uuid_generate_v4(), '전자기기');

CREATE table if not exists supply (
    supply_id UUID primary key DEFAULT uuid_generate_v4(),
    name varchar,
    quantity integer,
    status varchar DEFAULT '사용 가능',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    category_id UUID,
    Foreign Key (category_id) references category(category_id)
);

INSERT INTO supply (supply_id, name, quantity, category_id)
VALUES (uuid_generate_v4(), '연필', 10, (SELECT category_id FROM category WHERE name='사무용품' LIMIT 1));

INSERT INTO supply (supply_id, name, quantity, category_id)
VALUES (uuid_generate_v4(), '공책', 25, (SELECT category_id FROM category WHERE name='사무용품' LIMIT 1));

INSERT INTO supply (supply_id, name, quantity, category_id)
VALUES (uuid_generate_v4(), '키보드', 5, (SELECT category_id FROM category WHERE name='전자기기' LIMIT 1));

INSERT INTO supply (supply_id, name, quantity, category_id)
VALUES (uuid_generate_v4(), '노트북', 10, (SELECT category_id FROM category WHERE name='전자기기' LIMIT 1));

CREATE table if not exists rent (
    rent_id UUID primary key DEFAULT uuid_generate_v4(),
    member_id UUID,
    supply_id UUID,
    quantoty integer,
    status varchar,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
)