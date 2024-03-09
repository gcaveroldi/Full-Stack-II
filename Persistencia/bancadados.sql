CREATE DATABASE atvI-2024;

USE atvI-2024;

CREATE TABLE treino(
    cat_treino INT NOT NULL AUTO_INCREMENT,
    cat_tipotreino VARCHAR(100) NOT NULL,
    CONSTRAINT pk_treino PRIMARY KEY(cat_treino)
);

CREATE TABLE cliente(
    cliente_codigo INT NOT NULL AUTO_INCREMENT,
    cliente_nome VARCHAR(100) NOT NULL,
    cliente_datanasc DATE,
    cat_treino INT NOT NULL,
    CONSTRAINT fk_cat_treino FOREIGN KEY (cat_treino) REFERENCES treino(cat_treino),
    CONSTRAINT pk_cliente PRIMARY KEY(cliente_codigo)
);
