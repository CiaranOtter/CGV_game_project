# CGV_game_project
A projet for Computer graphics and visualisations (CGV) to develop a 3D game in three.js

## NODE installation and setup

So far the project only needs the basic npm dependecies and 'three' which is the node module for three.js. Included in this project, for convenience and so that npm can be used for the project, is the 'parcel' module which will allow the project to be run on a localhost server that is managed by node and javascript

to install these module and setup the enviroment you could either run: 

````shell
npm run setup-install
````
in your terminal in the CGV_game_project directory, which will automaticall install all the modules that are needed.


**Or** to manually install them run the following:

````shell
npm install
````
````shell 
npm install --save-dev three
````
````shell
npm install parcel
````

adding attributes and parameters that you want or need.

Your enviroment and node should now be setup and ready to go.
 
 ## Running the project using parcel
 
 in the package.json file there is the attribute "source" whichis cuurently set to "threejs_test/index.html". This attribute belongs to the parcel module. 
 By running :
 ````shell
 npm start
 ````
a parcel localhost server will be started hosting the "source" file which is currently the test three.js project index.html file (the rotating cube), which will later be set up to run the main game file for the project. 
 
 you could also use:
 ````shell
 npm run start-test
 ````
 This script is dedicated to starting a parcel server for the test project, so it will start a server with specifically the test project' index file. (When the main project is started "**npm start**" will no longer run the test project but "**npm run start-test**" will continue to do so)
 
 After running these scripts the project should now to running on a localhost server (normally localhost:1234 is used unless this address is already in use by another program, parcel will specify where it running however so don't wory too much about that).
 
 You can then open the localhost location in your browser and the program should be running there.
