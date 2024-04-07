

CREATE TABLE treino(
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(50) NOT NULL
);

CREATE TABLE cliente(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    id_treino INT,
    FOREIGN KEY (id_treino) REFERENCES treino(codigo) 
   
);

    CREATE TABLE cliente_treino (
    id_cliente_treino INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_treino INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_treino) REFERENCES treino(codigo)
);

