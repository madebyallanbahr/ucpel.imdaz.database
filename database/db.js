const { Client } = require("pg");
const { validationResult } = require('express-validator')

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next} next
 * @description Cria banco de dados referente ao imdaz e a tabela referente as matrículas
 */
exports.createDatabase = async (req, res, next) => {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "admin",
    port: 5432,
    database: "postgres", // Banco de dados de sistema que contém informações sobre outros bancos de dados
  });

  client
    .connect()
    .then(async () => { // Promise é função que ela tem esperar algo ser feito primeiro. Returna alguma coisa
      console.log("Connected to PostgreSQL");

      // Verificar se o banco de dados 'imdaz' já existe
      const checkDatabaseQuery =
        "SELECT datname FROM pg_catalog.pg_database WHERE datname = $1"; //
      const checkDatabaseParams = ["imdaz"];

      const result = await client.query(
        checkDatabaseQuery,
        checkDatabaseParams
      );

      if (result.rows.length === 0) {
        // Se o banco de dados 'imdaz' não existir, criar
        console.log("Creating database 'imdaz'");
        const createDatabaseQuery = "CREATE DATABASE imdaz";
        await client.query(createDatabaseQuery);
        console.log("Database 'imdaz' created successfully");
      } else {
        console.log("Database 'imdaz' already exists");
      }

      const checkDatabaseQueryEnrollments = "SELECT * from enrollments";

      const resultDatabaseQueryEnrollments = await client.query(checkDatabaseQueryEnrollments);

      if (resultDatabaseQueryEnrollments.fields.length === 0) {
        const createTableEnrollmentsQuery = `CREATE TABLE enrollments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      birthdate DATE NOT NULL,
      document VARCHAR(11) UNIQUE NOT NULL,
      gender VARCHAR(10) NOT NULL,
      class VARCHAR(50) NOT NULL,
      shift VARCHAR(20) NOT NULL,
      phone VARCHAR(20),
      parent VARCHAR(100)
    )`;
        await client.query(createTableEnrollmentsQuery);
      } else {
        console.warn('Tabela já existente')
      }



      await client.end();
      res.json("Database criado");
    }).catch((err) => { // Erro: Conexão recusada por dados incorretos
      console.error("Error connecting to PostgreSQL:", err);
    });
};

exports.viewEnrollments = async (req, res, next) => {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "admin",
    port: 5432,
    database: "postgres", // Banco de dados de sistema que contém informações sobre outros bancos de dados
  });

  client
    .connect()
    .then(async () => {
      const query = 'SELECT * from enrollments'
      client.query(query).then((result) => {
        client.end()
        res.status(200).json(result.rows)
      })
    }).catch((err) => {
      console.error(err)
    })
}

exports.createEnrollment = async (req, res, next) => {

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw errors.array()[0].msg
    }

    const client = new Client({
      host: "localhost",
      user: "postgres",
      password: "admin",
      port: 5432,
      database: "postgres", // Banco de dados de sistema que contém informações sobre outros bancos de dados
    });

    client
      .connect()
      .then(async () => {
        const query = `INSERT INTO enrollments (
        name,
        birthdate,
        document,
        gender,
        class,
        shift
    ) VALUES (
        '${req.body.studentName}',
        '${req.body.studentBirthdate}',
        '${req.body.studentDocument}',
        '${req.body.studentGender}',
        '${req.body.studentClass}',
        '${req.body.studentShift}'
    )`;
        await client.query(query).then((result) => {

          if (!result) {
            throw 'Erro interno'
          }

          res.status(201).json('Mátricula realizada com sucesso!')
        }).catch((err) => {
          switch (err.code) {
            case '23505':
              res.status(400).json('Mátricula já existente no banco de dados!')
              break;
            default:
              res.status(400).json(err)
              break;
          }
        })
      }).catch((err) => {
        console.error(err)
      })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateEnrollment = async (req, res, next) => {
  try {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      throw errors.array()[0].msg;
    }

    const client = new Client({
      host: "localhost",
      user: "postgres",
      password: "admin",
      port: 5432,
      database: "postgres", // Banco de dados de sistema que contém informações sobre outros bancos de dados
    });

    client
      .connect()
      .then(async () => {
        const query = `UPDATE enrollments
        SET ${req.body.studentAttribute} = $1
        WHERE document = $2`;


        await client.query(query, [req.body.studentAttributeValue, req.body.studentDocument]).then((result => {
          if (!result) {
            throw 'Erro de Requisição do Servidor'
          }
          if (result.rowCount === 0) {
            throw 'A matrícula não foi encontrada, verifique o documento informado.'
          }
          res.status(200).json(`A matrícula do CPF ${req.body.studentDocument} foi alterada com sucesso!`)
        })).catch((err) => {
          console.error(err);
          res.status(400).json(err)
        })
      })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.removeEnrollment = async (req, res, next) => {
  const errors = validationResult(req);


  try {
    if (!errors.isEmpty()) {
      throw errors.array()[0].msg;
    }

    const client = new Client({
      host: "localhost",
      user: "postgres",
      password: "admin",
      port: 5432,
      database: "postgres", // Banco de dados de sistema que contém informações sobre outros bancos de dados
    });

    client
      .connect()
      .then(async () => {
        const query = `DELETE FROM enrollments WHERE document=$1`
        const param = [req.body.studentDocument]
        await client.query(query, param).then((result) => {

          if (result.rowCount === 0) {
            throw 'Mátricula não encontrada!'
          }
          res.json('Mátricula excluída com sucesso!')

        }).catch((err) => {
          console.log(err)
          res.status(400).json(err)
        });

      })
  } catch (err) {
    res.status(422).json(err)
  }
}

exports.removeAllEnrollment = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw errors.array()[0].msg;
    }


    const client = new Client({
      host: "localhost",
      user: "postgres",
      password: "admin",
      port: 5432,
      database: "postgres", // Banco de dados de sistema que contém informações sobre outros bancos de dados
    });

    client
      .connect()
      .then(async () => {
        const query = 'TRUNCATE enrollments'
        await client.query(query).then((result) => {
          if (!result) {
            throw 'Erro de Requisição com Banco de Dados.'
          }
          res.json('Matrículas resetadas com sucesso!')
        }).catch((err) => {
          res.status(400).json("Matrículas não foram resetadas!")
        })

      }).catch((err) => {
        res.status(400).json(err)
      })
  } catch (err) {
    res.status(500).json(err)
  }
}