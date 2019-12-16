# Elevation Navigation System - Cloud Deployment Instructions


## Requirement
 - Node.js
 - npm
 - docker


## Set-up instructions:
  
  * Start an ec2 instance on AWS
  * [Security Groups] : Open port `8000` for backend, open port `3000` on frontend.
 
  * Backend :
    * Get Updates for Packages : `sudo apt-get update`
    * Install Docker : `sudo apt install docker.io`
    * Start Docker on Startup : `sudo systemctl start docker`
    * Checked Docker version : `docker --version`
    * Pull docker image : `docker pull gboeing/osmnx`
    * Checkout Elena Git Repo : `git clone https://github.com/mendeleden/CS520-Elena.git`
    * Change directory to Backend Cloud Directory : `cd CS520-Elena/cloud/Backend/`
    * Start up the container : `./run_aws.sh`
      * This script will start the docker image and expose port 8000.
    * Install Django and Django dependencies : `./pip_setup.sh`
      * This script will install django, django's dependencies and start the server.
  * Frontend : 
    * Change directory to Frontend Local Directory : `cd CS520-Elena/cloud/Frontend/`
    * Install Node.js and Npm
    * Initialize react and npm dependencies : `npm install`
    * Start the react app : `npm start`


In this set up, the django (containerized) is ran on the same server.
However, in the current deployment of our application the frontend and backend live on two differenet servers.
    
    
