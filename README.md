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
- Update and delete applications all in a single view.
- Save important notes for each application with no clutter.
- Select preferred colors or color code applications.
- Drag & Drop applications between multiple lists to quickly organize.

## Purpose and Specifications
**Two versions were developed** in tandum to explore the incremental increase of complexity when more system components are added to an application.
Both versions have the same core features which are described above. However, the process and location of which the data is stored are distinct. The exact *specification differences are listed below*.

### 1. This repository - Local Storage
Description: This version of JobTrackr was developed to demonstrate the power and utility of standalone Single Page Applications (SPA)s. It is entirely a client side application where all the data is stored in the client's Local Storage.
  * Unordered sub-list. 
  * Frontend: React & Redux
  * Server: None
  * Storage: Local Storage (Browser)
  * Version Control & Deployment: Github

**Checkout the live version here - [JobTrackr - LocalStorage](https://samqchau.github.io/jobtrackr/)**

### 2. JobTrackr - Authentication & Backed Up
Description: This version of JobTrackr was developed to explore the incremental complexity added from adapting the standalone SPA architecture to a client-server architecture with a single database.

  * Frontend: React & Redux
  * Server: Node (Express)
  * Storage: Postgres
  * Version Control: Github
  * Deployment: Would have to use something like AWS(ECS) for the multiple Docker containers.

**Checkout the other repository here - *[JobTrackr - Server & Database](https://github.com/samqchau/job-tracker)***
Clone & run docker-compose up

## After Thoughts
### 1. The Tradeoffs of using a database
  * Benefits
  ** 
