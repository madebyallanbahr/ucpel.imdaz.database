#### PROJETO INTEGRADOR
##### BANCO DE DADOS IMDAZ

P.I destinado ao desenvolvimento de um banco de dados usando linguagem de programação para demonstrar um efetivo e simples implementação para auxiliar na estrutura do banco de dados e modelagem do mesmo.

Idealizado por [Thonymah](https://www.github.com/thonymah) e [Allan Bahr](https://www.github.com/madebyallanbahr)

#### Execução da API
```npm start```

#### Rotas

##### Exibe as matrículas existentes

```localhost:5000/api/enrollments | GET```

---

##### Cria uma uma matrícula

`localhost:5000/api/enrollments/register | POST`

JSON
```
{
"studentName": "nomedealuno",
"studentBirthdate": "data-de-nascimento",
"studentDocument": "cpf",
"studentGender": "M",
"studentClass": "203B",
"studentShift": "Manhã",
// opicionais
"studentPhone": "telefone",
"studentParent": "responsavel"
}
```
