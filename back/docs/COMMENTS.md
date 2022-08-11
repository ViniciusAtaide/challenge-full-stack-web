# Documentação

Este documento explanará todas as decisões do projeto.

## Arquitetura

Eu sei que é um pouco overkill para esse projeto, mas decidi usar a arquitura limpa proposta pelo
uncle Bob, não segui a risca a nomenclatura proposta por ele, mas segui a ideia na separação das
camadas.

Fluxo: Controller -> Service -> Repository

Na camada Controller é feita a validação semântica dos dados. Na camada Service é feita a
validação das regras de negócio e por fim e não menos importante, a camada Repository, onde
tratamos os dados da aplicação.

## Libs

- bcryptjs - Para encriptar as senhas.
- body-parser - Para converter o body da requisição para JSON.
- connect-timeout - Para setar um tempo limite nos requests.
- cors - Para habilitar requests de outras origens.
- dotenv - Para carregar as variáveis de ambiente.
- express - Para criar o servidor.
- joi - Para validação dos dados.
- pg - Para conectar no Postgres.

## Documentação dos end-points

Na pasta **api** tem o arquivo do Insomnia para testar os end-points. Com mais tempo colocaria uma documentação melhor com o Swagger.

## Melhorias

Provavelmente adicionaria mais testes. Incluiria um login também com token JWT ou usaria alguma ferramenta como o KeyCloak para gerenciar os usuários. Cheguei a incluir o domínio de usuários, porém vi que pelo front não seria necessário login, apenas o CRUD dos estudantes, de qualquer forma fui até o fim, testei e gerei a documentação com o Insomnia para testes.

Por fim, incluiria um logger mais detalhado. Talvez mais coisas, mas por ser um projeto simples, a ideia é manter as coisas simples.
