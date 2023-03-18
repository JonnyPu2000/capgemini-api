# Instruções de Uso - API NodeJS com MongoDB em Docker
Este projeto contém os arquivos necessários para executar uma API NodeJS com MongoDB em contêineres do Docker. Este guia descreve os passos necessários para configurar e executar a API em seu próprio sistema.

## Pré-requisitos
Docker instalado no seu sistema

## Configuração
1. Clone o repositório para o seu sistema:
```
git clone https://github.com/JonnyPu2000/capgemini-api
```
2. Verifique se os arquivos Docker estão presentes no diretório do projeto:
```
docker-compose.yaml
Dockerfile
```
3. (Opcional) Configure o arquivo "mongodb.env" e "backend.env":

O arquivo "mongodb.env" inclui informações como o nome de usuário e a senha necessários para acessar o serviço MongoDB. Se você precisar alterar essas informações, basta modificar as variáveis de ambiente no arquivo. Além disso, lembre-se de atualizar as credenciais no arquivo "backend.env" para garantir que as informações de autenticação estejam sincronizadas com as alterações feitas no arquivo "mongodb.env".


## Execução
Construa as imagens e inicie os containers do Docker:
```
docker compose up --build
```
Isso iniciará os contêineres do Docker para o serviço "mongodb" e o serviço "backend". O comando também iniciará os contêineres em modo interativo, o que significa que você poderá ver a saída do console da API NodeJS.

## Acesso à API
Quando o processo de construção e inicialização estiver concluído, você poderá acessar a API NodeJS no endereço "http://localhost:8080/". A API NodeJS estará em execução em um contêiner do Docker, que está configurado para ouvir a porta 8080. Você pode usar um navegador da web ou um cliente HTTP, como o CURL ou o Postman.

## Documentação da API
A documentação da api pode ser encontrada neste [link](https://app.swaggerhub.com/apis/JonnyPu2000/rest-api_documentation/1.0.0).

## Contribuição
Se você encontrar algum problema ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

 
