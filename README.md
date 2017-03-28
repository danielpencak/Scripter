# Scripter
Created by: Daniel Pencak

## Alert

Currently, I have only tested the application in Google Chrome. Due to the use of Deepstream, Chrome throws up an alert for unsafe scripts. To remedy this at this stage, click on the shield in the URL bar and click "load unsafe script". I have a future goal to resolve this issue.

## Project Description

Scripter is a collaboration tool for screenwriters. The application allows screenwriters to collaborate remotely. Users can create or join screenwriting projects with each project's screenplay connected via Deepstream's data-sync technology.

### What problem does it solve?

I’d like an application that will allow me to connect and collaborate with fellow screenwriters.

### Who has this problem?

Kyle is a budding screenwriter. His next project is a collaboration with another writer. The collaborator lives across the country. They have hashed out a really great idea and want to make sure they both can effectively contribute to the project. Kyle needs a tool that will allow a script to be written collaboratively even though they live in different parts of the country.

### Context:

Kyle is looking to write a screenplay with another writer, who he went to school with. They had great success writing together when they were in school. They want to collaborate again but there is a problem. Kyle lives in Seattle and his friend in New York. They have been communicating via email and text and have come up with a great movie idea. Now they need to figure out how to write the script virtually. Kyle considers using a program like Google Docs but doesn't want to worry about formatting the script himself. Kyle finds out about Scripter which allows him to write a script that is formatted for him and allows his collaborator to view any changes to the project immediately so that they both can be on the same page as if they are sitting in their dorm room again cranking out another script.

### How does the application solve this problem?

1. An application that provides the user with the tools to virtually    collaborate on a script without having to use multiple applications

2. Has built in formatting so that the writer can focus on the content of the script knowing the format is on par with industry standards

### What was the biggest challenge to overcome?

The biggest challenge during development was working with the editor. I am currently using Draft.js and it works well but there are some limitations. For example, there are no page breaks. This is something I am looking to add in the future and most likely I will have to use a different editor or build my own from scratch.

## Features

### Tech Stack

1. React
2. CSS
3. Node.js
4. ExpressJS
5. Knex.js
6. PostgreSQL
7. JavaScript
8. React-Bootstrap
9. Draft.js
10. Deepstream

### Future Development

1. Add page breaks to the editor

      Consider using a different editor

      Build an editor from scratch

2. Fix the unsafe script issue

3. Improve the validations

4. Add outlining feature

      Give the user the ability to outline the script with notecards

      Make the notecards visible as they work on the script

5. Add live chat feature

      Use socket.io to provide the user with a live chat between all the collaborators of a project on both the project page and outline page

6. Allow the user to save the script

      Currently the scripts are retrieved using a custom dsRecord name

      Looking to add storage on deepstream.io as well as in my database

7. With the last several versions of the script saved allow the user to go through a history of all the versions

8. Add a social network aspect

      Allow the users to make scripts public or private

      Create a user profile page

      If the script is public it will show up on the user's profile page where anyone signed up on the site can view it and provide feedback

9. Allow the user to upload a profile picture
