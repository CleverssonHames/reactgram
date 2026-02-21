# Reactgran

Esse projeto eu fiz baseado no curso de udemy, é um projeto que vai do back ao front-end, o back-end é uma API com node e o front-end é react. Pude ver com esse projeto como é feito uma API, como funciona um middleware, controllers e integração com o banco de dados.
As tecnologias utilizadas foram basicamente Node no back-end usando o express para gerenciar as rotas, JWT para gerar tokens, ja no front-end foi utilizado o React e redux para gerenciar estados das requisicões, foi feito a criação de hooks persolizados e css para estilizar, esse projeto está bem completo.



## Para executar esse projeto é necessário criar uma conta no mongoDB.

### Executando back-end
Criar na pasta BACKEND um arquivo com o nome .env e escrever no arquivo as seguintes váriaveis:

PORT=5000  
DB_USER=seuusuário  
DB_PASS=senha  
DB_STRCON=stringDeConexaoMongoDb  

feito isso, abrir o terminal na pasta backend e executar o comando: npm run server

### Executando front-end
Para o frontend basta entrar na pasta frontend, baixar as dependencias com o comando npm install e executar com o comando npm run dev.




