/* QUILT IT TABLES */
CREATE TABLE accounts(
    username VARCHAR(20)   PRIMARY KEY,
    password VARCHAR(200)  NOT NULL
);

CREATE TABLE quilts(
    quilt_id     SERIAL       PRIMARY KEY,
    designer     VARCHAR(20)  REFERENCES accounts(username),
    name         VARCHAR(20)  NOT NULL,
    arrangement  INTEGER[]    NOT NULL
);

CREATE TABLE squares(
    square_id    SERIAL       PRIMARY KEY,
    link         VARCHAR(20)  NOT NULL,
    designer     VARCHAR(20)  REFERENCES accounts(username)
);


/* DUMMY DEV DATA */
INSERT INTO accounts (username, password)
VALUES ('sally', 'iheartquilts');

Insert INTO squares (link, designer)
VALUES
('sqr1.png', 'sally'),
('sqr2.jpeg', 'sally'),
('sqr3.png', 'sally'),
('sqr4.png', 'sally'),
('sqr5.png', 'sally'),
('sqr6.jpeg', 'sally'),
('sqr7.png', 'sally'),
('sqr8.png', 'sally'),
('sqr9.png', 'sally');

INSERT INTO quilts (designer, name, arrangement)
VALUES
('sally', 'My First Quilt', '{1, 2, 3, 4, 5, 6, 7, 8, 9}'),
('sally', 'Babys First quilt', '{9,8,7,6,5,4,3,2,1}');


/* ROLES */
CREATE USER quilter WITH PASSWORD 'getstitches';

GRANT SELECT, INSERT, UPDATE, DELETE ON accounts TO quilter;
GRANT SELECT, INSERT, UPDATE, DELETE ON quilts TO quilter;
GRANT SELECT, INSERT, UPDATE, DELETE ON squares TO quilter;

GRANT USAGE, SELECT ON SEQUENCE quilts_quilt_id_seq TO quilter;
GRANT USAGE, SELECT ON SEQUENCE squares_square_id_seq TO quilter;