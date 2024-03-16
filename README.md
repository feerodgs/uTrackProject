# uTrackProject

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/feerodgs/uTrackProject/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/feerodgs/uTrackProject/blob/main/README.pt-br.md)

## Projeto Integrador V – Advanced Application Development

### Members:
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

## About the uTrack project
<p align="center" width="100%">
    <img width="33%" src="https://github.com/feerodgs/uTrackProject/blob/main/uTrackProject/imgs/logo.png">
</p>

### Scope:
This group will develop a study on integrating parcel tracking APIs, which will centralize all major tracking applications in Brazil on a single website.
For this purpose, a web app will be developed using pods orchestrated with Kubernetes, which will be responsible for containing all the application's infrastructure, from the web app part to the part of tracking APIs requests, with the exception of user authentication, which will be managed by Amazon Cognito.

### Project Architecture
![Arquitetura](https://github.com/feerodgs/uTrackProject/blob/kubernetes/uTrackProject/imgs/arquitetura.png)

### Methodology

Each member of the group will play specific and extremely important roles in the project development. We have divided the group in a way that each one can utilize and develop their skills in the areas where they excel the most. The frontend team consists of Nathan Gowacki, Ricieri Nava, and Gustavo Azambuja, who will be responsible for planning and executing from the visual identity of the application to frontend development, using technologies like Figma and Photoshop for design and UI/UX, and React.js for application development. The backend team consists of Felipe Rodrigues and Luiz Augusto Dalla Rosa, who will play a fundamental role in creating the MySQL database and developing Java scripts responsible for communicating with carrier APIs, such as Correios, for example. The infrastructure is managed by Marco Boschetti, who will develop the entire project infrastructure, including creating Kubernetes clusters, integration with Cognito for user authentication, among other tasks.

In order to improve team organization, communication, and collaboration, we chose to adapt the Scrum management framework. Each member's tasks will be organized into a workflow in the [Trello](https://trello.com/b/BJr7bmX3/utrack-app-trello) tool. This way, we can observe each group member's performance, their completed activities, and impediments. The board will be organized based on the agile Kanban method, separating activities into Todo, Doing, Review, and Done. Unlike the Scrum method, which would require Daily Meetings to align progress in each area of the project, we decided to hold "weekly meetings", where we will review the team's performance, discuss results, share learnings, make necessary adjustments, and assist team members with their impediments. These meetings will be held on Fridays during the dedicated periods for the integrative project execution.


### Entity-Relationship Model


###
- [x] User registration
- [x] Tracking code registration
- [x] Tracking updates
