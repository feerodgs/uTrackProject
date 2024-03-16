# uTrackProject

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/feerodgs/uTrackProject/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/feerodgs/uTrackProject/blob/main/README.pt-br.md)

## Projeto Integrador V – Desenvolvimento Avançado de Aplicações

### Integrantes:
- Felipe Rodrigues 
    - 101447@aluno.uricer.edu.br

- Gustavo Azambuja 
    - 065651@aluno.uricer.edu.br

- Luiz Augusto Dalla Rosa 
    - 101516@aluno.uricer.edu.br

- Marco Boschetti
    - 092440@aluno.uricer.edu.br

- Nathan Gowacki
    - 101741@aluno.uricer.edu.br

- Ricieri Nava 
    - 044287@aluno.uricer.edu.br

## Sobre o projeto uTrack
<p align="center" width="100%">
    <img width="33%" src="https://github.com/feerodgs/uTrackProject/blob/kubernetes/uTrackProject/imgs/logo.png">
</p>


### Escopo:
Este grupo irá desenvolver um estudo de integração de APIs de rastreio de encomendas, que irá centralizar em um único site todos os principais aplicativos de rastreio do Brasil.
Para isto, será desenvolvido um web app com o uso de pods orquestrados com Kubernetes que serão responsáveis por conter toda a infraestrutura da aplicação, desde a parte do web app, até a parte das requisições das APIs de rastreio, com exceção da autenticação de usuário, que será gerenciada pelo Amazon Cognito.


### Arquitetura do Projeto
<p align="center" width="100%">
    <img width="100%" src="https://github.com/feerodgs/uTrackProject/blob/kubernetes/uTrackProject/imgs/arquitetura.png">
</p>


### Metodologia

Cada membro do grupo desempenhará funções específicas e de extrema importância no desenvolvimento do projeto. Separamos o grupo de maneira que cada um possa utilizar ao máximo e desenvolver suas capacidades nas áreas em que mais se destacam. A equipe de frontend é composta por Nathan Gowacki, Ricieri Nava e Gustavo Azambuja, os quais serão responsáveis por planejar e executar desde a identidade visual do aplicativo até o desenvolvimento do frontend, utilizando tecnologias como Figma e Photoshop para design e UI/UX, e React.js para o desenvolvimento da aplicação. A equipe de backend é composta por Felipe Rodrigues e Luiz Augusto Dalla Rosa, os quais desempenharão um papel fundamental na criação do banco de dados MySQL e no desenvolvimento de scripts em Java que serão responsáveis pela comunicação com as APIs das transportadoras, como Correios, por exemplo. A infraestrutura é composta por Marco Boschetti, que desenvolverá toda a infraestrutura do projeto, incluindo a criação dos clusters Kubernetes, integração com o Cognito para autenticação de usuários, entre outras tarefas.


Com o objetivo de aprimorar a organização, comunicação e colaboração da equipe, optamos por adaptar o framework de gerenciamento Scrum. As tarefas de cada membro serão organizadas em um fluxo de trabalho na ferramenta [Trello](https://trello.com/b/BJr7bmX3/utrack-app-trello). Dessa maneira, poderemos observar o desempenho de cada membro do grupo, suas atividades realizadas e impedimentos. O quadro será organizado com base no método ágil Kanban, separando as atividades em Todo, Doing, Review e Done. Ao contrário do método Scrum, no qual seria necessário realizar Daily Meetings para alinhar o andamento em cada área do projeto, decidimos realizar "weekly meetings", onde iremos revisar o desempenho da equipe, discutir resultados, compartilhar aprendizados, fazer ajustes necessários e auxiliar os membros da equipe com seus impedimentos. Essas reuniões serão realizadas durante as sextas-feiras nos períodos dedicados à execução do projeto integrador.

### Banco de dados



### Modelo Entidade-Relacionamento


### Funcionalidades do projeto
- [x] Cadastro de usuário
- [x] Cadastro de código de rastreio
- [x] Atualizações de rastreio
