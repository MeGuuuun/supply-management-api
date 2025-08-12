-- uuid-ossp 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE table if not exists member (
    member_id UUID primary key DEFAULT uuid_generate_v4() ,
    name varchar,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO member VALUES
('11111111-1111-1111-1111-111111111111','관리자'),
('22222222-2222-2222-2222-222222222222','사용자1'),
('33333333-3333-3333-3333-333333333333','사용자2');

CREATE table if not exists category (
    category_id UUID primary key DEFAULT uuid_generate_v4(),
    name varchar,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO category VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '사무용품'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '전자기기');

CREATE table if not exists supply (
    supply_id UUID primary key DEFAULT uuid_generate_v4(),
    name varchar,
    quantity integer,
    status varchar DEFAULT '사용 가능',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    category_id UUID,
    Foreign Key (category_id) references category(category_id)
);

INSERT INTO supply (supply_id, name, quantity, category_id) VALUES
('00000001-0000-0000-0000-000000000001', '연필', 10, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('00000001-0000-0000-0000-000000000002', '공책', 25, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('00000001-0000-0000-0000-000000000003', '키보드', 5, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
('00000001-0000-0000-0000-000000000004', '노트북', 10, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

CREATE table if not exists rent (
    rent_id UUID primary key DEFAULT uuid_generate_v4(),
    member_id UUID,
    supply_id UUID,
    quantity integer,
    status varchar,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO rent (rent_id, member_id, supply_id, quantity, status) VALUES
('00000002-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222','00000001-0000-0000-0000-000000000001',3,'대여 중');