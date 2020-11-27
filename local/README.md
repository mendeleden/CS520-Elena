# Elevation Navigation System - Local Machine Deployment Instructions


## Requirement
 - Node.js
 - npm
 - docker


## Set-up instructions (Linux/Ubuntu):
  * Backend :
    * Open a terminal on local macihne 
    * Get Updates for Packages : `sudo apt-get update`
    * Install Docker : `sudo apt install docker.io`
    * Start Docker on Startup : `sudo systemctl start docker`
    * Checked Docker version : `docker --version`
    * Pull docker image : `docker pull gboeing/osmnx`
    * Checkout Elena Git Repo : `git clone https://github.com/mendeleden/CS520-Elena.git`
    * Change directory to Backend Local Directory : `cd CS520-Elena/local/Backend/`
    * Start up the container : `./run_aws.sh`
      * This script will start the docker image and expose port 8000.
    * Install Django and Django dependencies : `./pip_setup.sh`
      * This script will install django, django's dependencies and start the server.
  * Frontend : 
    * Open a terminal on local macihne 
    * Checkout Elena Git Repo : `git clone https://github.com/mendeleden/CS520-Elena.git`
    * Change directory to Frontend Local Directory : `cd CS520-Elena/local/Frontend/`
    * Install Node.js and Npm
    * Initialize react and npm dependencies : `npm install`
    * Start the react app : `npm start`

