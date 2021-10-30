# Jobtrackr
JobTrackr is a personal, individual project that empowers users to track their applications during the job hunt. 
Feel free to explore the code, reference it, and clone it for examples of how to use React and Redux.

**Checkout the live version here - [JobTrackr - LocalStorage](https://samqchau.github.io/jobtrackr/)**

https://user-images.githubusercontent.com/67344952/139521521-1d308184-0034-49e9-9fda-527f62da1abf.mp4

## Table of Contents
  * **Core Features**
  * **Purpose and Specifications**
  * **Details**
  * **After Thoughts**

## Core Features
- Drag & Drop applications between multiple lists to quickly organize.
- Update and delete applications all in a single view.
- Save important notes for each application with no clutter.
- Select preferred colors or color code applications.

## Purpose and Specifications
**Two versions were developed** in tandum to explore the incremental increase of complexity when more system components are added to an application.
Both versions have the same core features which are described above. However, the process and location of which the data is stored are distinct. The exact *specification differences are listed below*.

### 1. This repository - Local Storage
Description: This version of JobTrackr was developed to demonstrate the power and utility of standalone Single Page Applications (SPA)s. It is entirely a client side application where all the data is stored in the client's Local Storage.
  * Frontend: React & Redux
  * Server: None
  * Storage: Local Storage (Browser)
  * Version Control & Deployment: Github

**Checkout the live version here - *[JobTrackr - LocalStorage](https://samqchau.github.io/jobtrackr/)***

### 2. JobTrackr - Authentication & Backed Up
Description: This version of JobTrackr was developed to explore the incremental complexity added from adapting the standalone SPA architecture to a client-server architecture with a single database.
  * Frontend: React & Redux
  * Server: Node (Express)
  * Storage: Postgres
  * Version Control: Github
  * Deployment: Would have to use something like AWS(ECS) for the multiple Docker containers.

**Checkout the other repository here - *[JobTrackr - Server & Database](https://github.com/samqchau/job-tracker)***
*Clone & run docker-compose up*

## Details
   #### API Design
   #### Database Schemas
   #### Protected Paths

## After Thoughts
   #### The Tradeoffs of using a database
    The primary benefit of using a database is being able to host a database on the internet. This way, users can access their precious data as long as they have internet access. In contrast, the live demo (Local Storage version) of JobTrackr stores all data using the browser's local storage. If a user had the single page application, the user could use the application without internet access.
    
    For most enterprise applications, it is a fundamental requirement of the product that the data must be accessible everywhere. Because there is physical distance between the user's machine and the database machine, the data takes more time traveling across the network. In a simple app like JobTrackr, users will anticipate updates to happen immediately. In addition, job application data is not the most sensitve data. Therefore I opted for *eventual consistency* in both versions. If one of the applications is out of place or one note is missing, it's not the end of the world. However, for highly sensitive information, *absolute consistency* is a must. 
    
    This manifested clearly in the client side application when managing Redux state. Should the Redux state have been updated first for maximum responsiveness or should the application wait until it recieves a response from the server? In hindsight, as it often is, a hybrid approach would've been more appropriate. Redux state could've been immediately updated to reflect that an HTTP request was sent. A loader would be displayed until the application recives a response.
    
   #### Database Selection
