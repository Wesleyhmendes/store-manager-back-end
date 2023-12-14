# Store Manager

Neste projeto, foi desenvolvido uma API RESTful utilizando a arquiterura de software em camadas. A API é um sistema de gerenciamento de vendas em que é possível criar, visualizar, deletar e atualizar produtos e vendas utilizando o banco de dados MySQL para gestão de dados.
Também foi desenvolvido testes para garantir as funcionalidades das implementações.

## 🚀 Começando

> - ⚠️ É necessário ter a versão Node 16.14 ou superior instalada localmente.

<br />

<details>
  <summary><strong>🔧 Instalação</strong></summary>
<br />
  
1. Clone o repositório
  * `git clone git@github.com:Wesleyhmendes/store-manager-back-end.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd store-manager-back-end.git`

2. Instale as dependências [**Caso existam**]
  * `npm install`

3. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora crie uma branch com o nome desejado

<br />
</details>

<br />

**🐳 Iniciando a aplicação no Docker Compose**

```bash
# Instale as dependências
npm install

# Inicie os containers do compose `backend` e `db`
# A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
docker-compose up -d

# É possível ver os logs da aplicação com `docker logs -n 10 -f <nome-do-container>`
docker logs -n 10 -f store_manager
```
<br />


**🖥️ Iniciando a aplicação localmente**

> ⚠️ Atenção: Ao rodar localmente, a aplicação deverá receber variáveis de ambiente como exemplificado em [`env.example`](./env.example) para poder se comunicar com o serviço de banco de dados.

```bash
# Instale as dependências
npm install

# Inicie apenas o serviço `db` no compose
docker-compose up -d db

# Inicie a aplicação em modo de desenvolvimento
npm run dev:local
```

<details>
  <summary><strong>📋 Requisitos</strong></summary>
<br />

**1 - Crie endpoints para listar produtos**
<br />
<br />
**2 - Crie endpoints para listar vendas**
<br />
<br />
**3 - Crie endpoint para cadastrar produtos**
<br />
<br />
**4 - Crie validações para o cadastro de produtos**
<br />
<br />
**5 - Crie endpoint para cadastrar vendas**
<br />
<br />
**6 - Crie validações para o cadastro de vendas**
<br />
<br />
**7 - Crie endpoint para atualizar um produto**
<br />
<br />
**8 - Crie endpoint para deletar um produto**
<br />
<br />
**9 - Crie endpoint para deletar uma venda**
<br />
<br />
**10 - Crie endpoint para atualizar a quantidade de um produto em uma venda**
<br />
<br />
**11 - Crie endpoint para pesquisar produtos**
<br />
<br />
</details>


## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Node.js](https://nodejs.org/docs/latest/api/) - O software usado
* [npm](https://www.npmjs.com/) - Gerente de Dependência

## 📌 Versão

Nós usamos [Docker](https://www.docker.com/) para controle de versão.

## ✒️ Autores

* **Wesley Mendes** - *Trabalho Inicial* - [Wesley Mendes](https://github.com/Wesleyhmendes)
