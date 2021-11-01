# Jobtrackr
JobTrackr is a personal, individual project that empowers users to track their applications during the job hunt. 
Feel free to explore the code, reference it, and clone it for examples of how to use React and Redux.

**Checkout the live demo here - [JobTrackr - LocalStorage](https://samqchau.github.io/jobtrackr/)**

## Table of Contents
  **[Core Features](https://github.com/samqchau/jobtrackr/blob/main/README.md#core-features)** | 
  **[Usage](https://github.com/samqchau/jobtrackr/blob/main/README.md#usage)** | 
  **[Purpose and Specifications](https://github.com/samqchau/jobtrackr/blob/main/README.md#purpose-and-specifications)** | 
  **[Details](https://github.com/samqchau/jobtrackr/blob/main/README.md#details)** |
  **[After Thoughts](https://github.com/samqchau/jobtrackr/blob/main/README.md#after-thoughts)**

![jobtrackr_demo](https://user-images.githubusercontent.com/67344952/139654103-e5db5921-9863-4186-b29f-9009df625d8a.gif)

## Core Features
* Drag & Drop applications between multiple lists to quickly organize.
* Update and delete applications all in a single view.
* Save important notes for each application with no clutter.
* Select preferred colors or color code applications.

## Usage
Requirements: Git, Node, and npm or yarn.

* git clone https://github.com/samqchau/jobtrackr.git
* Navigate to the directory
* npm start

## Purpose and Specifications
**Two versions were developed** in tandum to explore the incremental increase of complexity when more system components are added to an application.
Both versions have the same core features which are described above. However, the process and location of which the data is stored are distinct. The differences are listed below.

### Version 1 - Local Storage (current respository)
Description: This version of JobTrackr was developed to demonstrate the power and utility of standalone Single Page Applications (SPA)s. It is entirely a client side application where all the data is stored in the client's Local Storage.
  * Frontend: React & Redux
  * Server: None
  * Storage: Local Storage (Browser)
  * Version Control & Deployment: Github

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />

**Checkout the live demo here - *[JobTrackr - LocalStorage](https://samqchau.github.io/jobtrackr/)***

### Version 2 - w/ Database
Description: This version of JobTrackr was developed to explore the incremental complexity added from adapting the standalone SPA architecture to a client-server architecture with a single database.
  * Frontend: React & Redux
  * Server: Node (Express)
  * Storage: Postgres
  * Version Control: Github
  * Deployment: Would have to use something like AWS(ECS) for the multiple Docker containers.

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>

**Checkout the repository here *[JobTrackr - Server & Database](https://github.com/samqchau/job-tracker)***

## Details
   #### API Design
   The primary resources stored by the JobTrackr database are minimal user, application, and note data.
   Each of these resources is accessible at their respective API endpoints.

<div align="center">
 
   | Resource | Route | HTTP Verbs |
   |    :---   | :--- |   :---:    |
   |  Users   | api/user/login | POST |
   | Applications | api/apps | GET, POST |
   |  | api/app/:id | PUT, DELETE |
   |  | api/app/:id/notes | GET, POST |
   | Notes | api/note/:id | PUT, DELETE |
   
</div> 
 
   #### Database Schemas
<div align="center">
 
   | Table | Column | Data Type | Default | Constraints |
   | --- | --- | :---: | :---: | :---: |
   | Users | id | VARCHAR | | PRIMARY KEY,  NOT NULL |
   | | email | CITEXT | | NOT NULL, UNIQUE |
   | Applications | id | uuid | uuid_generate_v4( ) | PRIMARY KEY, NOT NULL |
   | | user_id | VARCHAR | --- | NOT NULL, FOREIGN KEY |
   | | company_name | VARCHAR(20) | --- | NOT NULL |
   | | date_applied | timestamp | CURRENT_TIMESTAMP | |
   | | last_updated | timestamp | CURRENT_TIMESTAMP | |
   | | index | integer | --- | NOT NULL |
   | | fav_index | integer | --- | NOT NULL |
   | | color | VARCHAR | 'white' | |
   | Notes | id | uuid | uuid_generate_v4( ) | PRIMARY KEY, NOT_NULL |
   | | application_id | uuid | | NOT NULL, FOREIGN KEY |
   | | created_on | timestamp | CURRENT_TIMESTAMP | NOT NULL |
   | | last_updated | timestamp | CURRENT_TIMESTAMP | |
   | | content | text | | NOT NULL | 
 
</div> 

   #### Protected Routes
   In version 2, Google Firebase is used for authentication. When the client authenticates through Firebase, Firebase returns a lot of information about the user. In this use case, only a user id and email are passed to the server to store in the Postgres database. The user id is salted and used to generate a token (JWT) that is passed back to the user. Every request users make is validated by Express middleware. The middleware recieves the token and decodes it. If the token is valid, the the next middleware in the proper request cycle is called, otherwise the user recieves an error message.

## After Thoughts
   #### The Tradeoffs of using a database
   The primary benefit of using a database is being able to host a database on the internet. This way, users can access their precious data as long as they have internet access. In addition, replicas of the database could quickly replace the database machine if it failed. In contrast, the live demo (Local Storage version) of JobTrackr stores all data using the browser's local storage. If a user had the single page application, the user could use the application without internet access, but if the user's machine was destroyed, they would lose all their data.
    
   For most enterprise applications, fundamental requirements of the products specify the data must be accessible everywhere and cannot be lost. Nowadays, databases are used in some form in almost every application. A side effect of remote database usage is physical distance between the user's machine and the database machine. The data takes more time traveling across the network. In a simple app like JobTrackr, users will anticipate updates to happen immediately. In addition, job application data is not the most sensitve data. Therefore I opted for *eventual consistency* in both versions. If one of the applications is out of place or one note is missing, it's not the end of the world. However, for highly sensitive information, *absolute consistency* is a must. 
    
   This manifested clearly in the development of the client side managing Redux state. Should the Redux state have been updated first for maximum responsiveness or should the client application wait until it recieves a response from the server? In hindsight, as it often is, a hybrid approach would've been more appropriate. Redux state could've been immediately updated to reflect that an HTTP request was sent. A loader would be displayed until the application receives a response.
    
   #### Database Type Selection
   PostGres was selected as the database used to support JobTrackr Version 2. It is a relational database that stores data in rows organized by tables. All the rows of one table are stored together on disk. One of the greatest advantages of using a relational database is the capability to write complex queries. This empowers engineers to build relational data that can be analyzed in trival to complex ways. In hindsight, I learned a ton about Postgres, but if JobTrackr was to scale, a relational database was the incorrect choice for the current design of JobTrackr. In a way, the design I opted for leveraged the worst parts of the way Postgres stores data, and neglected the best features.
   
   JobTrackr stores job application data. The data is not analyzed or parsed further. It's a simple application, but hypothetically it could be scaled. With the current table schemas users, applications, and notes are all stored in separate tables. When a user makes a request to find their job application data, in the best case, Postgres SELECTs all applications by user.id, then has to JOIN all the notes to applications. All these tables could be sharded by user.id, but with the current use cases, a document or noSQL database would be a better option.
   
   In these types of databases, the data that is accessed together is stored together. There would be less disk reads when all the users' applications, and those applications' notes are all stored together physically. The schema is more flexible, and these types of databases are intrinsically more horizontally scalable. Both of these qualities are more aligned with the current specifications of JobTrackr.
