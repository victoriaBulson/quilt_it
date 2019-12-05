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
    link         VARCHAR(20)  NOT NULL
);


/* DUMMY DEV DATA */
INSERT INTO accounts (username, password)
VALUES ('sally', 'iheartquilts');

Insert INTO squares (link)
VALUES
('sqr1.png'),
('sqr2.png'),
('sqr3.png'),
('sqr4.png'),
('sqr5.png'),
('sqr6.png'),
('sqr7.png'),
('sqr8.png'),
('sqr9.png');

INSERT INTO quilts (designer, name, arrangement)
VALUES
('sally', 'My First Quilt', '{1, 2, 3, 4, 5, 6, 7, 8, 9}'),
('sally', 'Babys First quilt', '{9,8,7,6,5,4,3,2,1}');


/* ROLES */
CREATE USER quilter WITH PASSWORD 'get.stitches';

GRANT SELECT, INSERT, UPDATE, DELETE ON accounts TO quilter;
GRANT SELECT, INSERT, UPDATE, DELETE ON quilts TO quilter;
GRANT SELECT, INSERT, UPDATE, DELETE ON squares TO quilter;

GRANT USAGE, SELECT ON SEQUENCE quilts_quilt_id_seq TO quilter;
GRANT USAGE, SELECT ON SEQUENCE squares_square_id_seq TO quilter;