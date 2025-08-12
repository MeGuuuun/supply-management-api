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
('00000000-0000-0000-0000-000000000000', '삭제'),
('12000000-0000-0000-1111-000000000001', '사무용품'),
('12000000-0000-0000-1111-000000000002', '전자기기');

CREATE table if not exists supply (
    supply_id UUID primary key DEFAULT uuid_generate_v4(),
    name varchar,
    quantity integer,
    status varchar DEFAULT '사용 가능',
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    category_id UUID
);

INSERT INTO supply (supply_id, name, quantity, category_id) VALUES
('00000001-0000-0000-0000-000000000001', '연필', 10, '12000000-0000-0000-1111-000000000001'),
('00000001-0000-0000-0000-000000000002', '공책', 25, '12000000-0000-0000-1111-000000000001'),
('00000001-0000-0000-0000-000000000003', '키보드', 5, '12000000-0000-0000-1111-000000000002'),
('00000001-0000-0000-0000-000000000004', '노트북', 10, '12000000-0000-0000-1111-000000000002');

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