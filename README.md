## Introduction
I worked in a group with three other students to complete this project as part of the General Assembly Software Engineering Immersive course. The course was split into four modules, and this was our submission for module three. During module three, we learnt about Node, Express and Mongo. This was my first exposure to server-side software and databases. The finished project was deployed with Netlify (front end) and Heroku (back end), and can be found [here](https://ketokitchen-proj-three-sei.netlify.app/). This is the back end repository. The front end can be found [here](https://github.com/tigeryant/sei-project-three-fe).

## Aim
We were given one week to build a full stack web application using the MERN stack (Mongo, Express, React and Node). We decided to build a keto recipe website which we gave the name ‘KetoKitchen’.

## Structure
The app involves several different pages and components: a landing page, a show page, footer pages, and a profile page. Some of the main features we integrated into the app were a search and filter function, a favourites feature, comments and user authentication.

## My role
For the first few days, we all worked together on the most fundamental parts of the application so that we had a basic skeleton for the app. After a few days, once this was built, we branched off and took a more modular approach, with each of us working on a separate component or task. 
My main role at this point was to work on user authentication and, following this, the favourites feature. This involved both front and back end development. 

### User authentication
To implement user authentication I built a login and register page for the front end, and used json web tokens (the jwt library) on the front and back end.

### Favourites feature
On the front end, I helped to add a toggle feature to the ‘Show’ page, which made an API call every time the user added or removed a recipe from their favourites. I added functionality to the profile page which made an API call to retrieve all of the items in the user’s favourites and display them on the DOM.

The majority of the work on this feature involved the back end. In order to handle requests, I had to edit the user schema, set up routing and middleware and make database queries using Mongoose. 

## Technology and key take-aways

The main technologies used to create this app were React, Node, Mongo and Express. We also used Git, Mongoose, Bootstrap, JWT, Axios and more.  This was also good practise in teamwork, collaboration and division of labour. Of all the projects I completed at GA, this one really improved my skills the most. There were two technologies that in particular that I became a lot more comfortable with throughout this week: Express and Git.

### Express
This was the first time I really got to grips with how schemas, routing, middleware and databases work. I spent a lot of time looking over the codebase, reading documentation and tweaking and testing aspects of the back end. This experience was truly invaluable and serves as a good reminder of the benefits of active over passive learning.

### Git
As we worked in a group of four, this project involved the use of Git for version control more than any of the other projects. Over the course of the week, I learnt more about branches, merging, and several new Git commands. I frequently helped other group members with resolving conflicts, merging, managing branches and stashing. This was also very useful as I know have a much better mental model of how Git works.
