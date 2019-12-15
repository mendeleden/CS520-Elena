# Elevation Navigation System - Cloud Deployment Instructions


## Requirement
 - Node.js
 - npm
 - docker


## Set-up instructions:
  * Start an ec2 instance on AWS
  * Open port `8000` for backend, open port `3000` on frontend.
  * Backend :
    * Get Updates for Packages : `sudo apt-get update`
    * Install Docker : `sudo apt install docker.io`
    * Start Docker on Startup : `sudo systemctl start docker`
    * Checked Docker version : `docker --version`
    * Pull docker image : `docker pull gboeing/osmnx`
    * Checkout Elena Git Repo : `git clone https://github.com/mendeleden/CS520-Elena.git`

  * [Deploy on local machine](https://github.com/mendeleden/CS520-Elena/tree/master/local)

