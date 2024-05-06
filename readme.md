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

#### Editar uma matrícula de um estudante pelo CPF.

`localhost:5000/api/enrollments/update | PUT`

JSON

```
"studentAttribute": "document", // Especifica o item da tabela a ser modificado (name, document, shift ou class)
"studentAttributeValue": "cpf(novo)", // Dado do novo valor no dado da tabela.
"studentDocument": "cpf(da conta a ser modificada)", // CPF do Estudante de destino a receber as alterações.
```

#### Cancelar uma matrícula de um estudante pelo CPF

`localhost:5000/api/enrollments/cancel | DELETE`

JSON
```
"studentDocument": "(cpf)" // CPF a quem será excluida a matrícula. 
```

#### Cancelar todas as matrículas

`localhost:5000/api/enrollments/admin/cancel | DELETE`

JSON
```
"key": "chave secreta" // chave secreta para realizar uma alteração de permissão máxima no banco de dados.
```