# GRI-Earthquake

GRI-Earthquake is an example project used to develop the work-in-progress Geospatial Web Framework developed in the
Geospatial Research Institute Toi Hanagarau. This application is used to visualise the location, magnitude, and depth of earthquakes within New Zealand.

![image](https://user-images.githubusercontent.com/41398636/126084844-1bad1906-8784-4f9b-93ec-df0e5e995dd6.png)


## Setup for local development

This project consists of two parts, a client web app in `client/`, and a web server REST API in `server/`.

### Requirements
#### Required Software
* [Python3](https://www.python.org/downloads/)
* [pip](https://pypi.org/project/pip/) (**P**ip **I**nstalls **P**ackages - Python package manager)
* [Node.JS / npm](https://nodejs.org) (**N**ode **P**ackage **M**anager)
  
#### Required Credentials
* [Here API Freemium Project](https://developer.here.com/projects) (Project Registration for API for OSM tile data for harp.gl)
* [Here XYZ API Access Management Token](https://xyz.api.here.com/token-ui/accessmgmt.html) (Free API for map data for harp.gl)


### Running development environment from source
1. Begin by installing required software `python3`, `pip` and `npm`.
2. Install server dependencies:
    1. Create virtual environment:
    ```bash
    # From the root directory of the project
    cd server/
    # Create and activate virtual environment
    pip install virtualenv
    virtualenv venv
    ```
    2. Activate virtual environment:
        - Windows:
       ```cmd
       venv\Scripts\activate
       ```

        - Linux:
       ```bash
       source venv/bin/activate
       ```
    3. Install Python packages:
       ```bash
        pip install -r requirements.txt 
       ```


3. Install client dependencies:

    ```bash
    # From the root directory of the project
    cd client/
    # Install node packages from package.json
    npm install
    # Build decoder bundle
    npm run build:harp-gl-decoder
    ```
   At this stage you must also have an access token for mapping. This can be created for free by first creating a freemium project with the 
   [Here API](https://developer.here.com/projects).  
   After this you must retrieve a [Here XYZ API Access Management Token](https://xyz.api.here.com/token-ui/accessmgmt.html) 
   by visiting this link and selecting `Generate Token` under the `Access Management` tab and selecting all features.
   
   Then create a local environment file `proj_root/client/.env.local` and fill it with the token copied from the site above.
   ```bash
   # proj_root/client/.env.local
   VUE_APP_HEREAPI=enter_your_access_token_here
   ```

4. Running development app:
    1. Server:
        ```bash
        # From project root
        cd server/src/server/
        flask run
        ```
   2. Client (in a new terminal window or with server running in background):
        ```bash
        # From project root
        cd client/
        npm run serve
        ```

5. Opening app:  
   Open the client web address in your browser. The address will be listed in the terminal used for starting the client.

If you wish to remove excessive warnings about source maps from the dev console in your browser, then disable JavaScript
source maps.  
To do this in Chrome go to dev tools `Settings > Preferences > Sources` and disable `Enable JavaScript source maps`.

### Deploying application to production deployment

We use `docker-compose` to deploy to the server, so see [docker-compose docs](https://docs.docker.com/compose/install/)
for installation instructions.

With `docker-compose` installed, a `docker` daemon service running on your server, and ports 5000 and 80 open, follow
these instructions:

1. Find your Here API token by following the instructions for creating an access token above.
2. Add the Here API token to your shell environment variables.

```bash
    echo "export HERE_MAPS_TOKEN=enter_your_access_token_here" >> ~/.bashrc
    source ~/.bashrc
```

3. Enter the folder you wish to store the source and clone the repository.

```bash
    git clone https://github.com/GeospatialResearch/gri-earthquake.git
```

4. Build the application.

```bash
    cd gri-earthquake
    docker-compose build
```

5. Deploy the application.

```bash
    docker-compose up
```

### Repository structure

```tree
gri-earthquake
└───client # files used in the client-side application, run in the user's browser  
└───server # files used in the server-side application, used to store data and perform intensive tasks
```

See also: [client README](client/README.md) and [server README](server/README.md)

## Contributions

Please see our [Issue Tracker](https://github.com/GeospatialResearch/gri-earthquake/issues)   for details on coming
features and additions to the software.

There is no current expectations of contributions to this project. We accept input in code reviews now. If you would
like to be involved in the project, please contact the maintainer.  
The Geospatial Web Framework that is being created alongside this project will be opened to the public in the coming
months. We will accept contributions to that project in the future.


## Contacts
Maintainer: Luke Parkinson [@LukeParky](https://github.com/LukeParky/)
[luke.parkinson@canterbury.ac.nz](mailto:luke.parkinson@canterbury.ac.nz)

## License

[MIT](LICENSE)
