# CGV_game_project
A projet for Computer graphics and visualisations (CGV) to develop a 3D game in three.js

## NODE installation and setup

So far the project only needs the basic npm dependecies and 'three' which is the node module for three.js. Included in this project as well for convenience is the parcel module which will allow the project to be run on a localhost server that is managed by node and javascript

to install these module and setup the enviroment:
you could either run in your terminal in the CGV_game_project directory

````shell
npm run setup-install
````
which will automaticall instal all three.

**Or** to manually install these run the following:


````shell
npm install
````
````shell 
npm install --save-dev three
````
````shell
npm install parcel
````
 adding attributes and parameters as you see fit 
 
 ## Running the project using parcel
 
 in the package.json file there is the attribute "source" whichis cuurently set to "threejs_test/index.html". 
 By running :
 ````shell
 npm start
 ````
 a parcel localhost server will be started hosting the "source" file. This currently starts the test three js project of the rotating cube, which will later be set upo to run th main game file for the project 
 
 you could also use:
 ````shell
 npm run start-test
 ````
 which will start a server with specifically the test project. (When the main project is started npm start will no longer run the test project but npm run start-test will continue to do so)
