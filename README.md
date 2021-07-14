# GRI-Earthquake

GRI-Earthquake is an example project used to develop the work-in-progress Geospatial Web Framework developed in the
Geospatial Research Institute Toi Hanagarau.

## Setup

This project consists of two parts, a client web app in `client/`, and a web server REST API in `server/`.

### Requirements

* [Python3](https://www.python.org/downloads/)
* [pip](https://pypi.org/project/pip/) (**P**ip **I**nstalls **P**ackages - Python package manager)
* [Node.JS / npm](https://nodejs.org) (**N**ode **P**ackage **M**anager)



### Running development environment from source
1. Install server dependencies:
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


2. Install client dependencies:

    ```bash
    # From the root directory of the project
    cd client/
    # Install node packages from package-lock.json
    npm ci
    ```

3. Running development app:
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
        node run serve
        ```
    


## Contacts

Maintainer: Luke Parkinson [@LukeParky](https://github.com/LukeParky/)
[luke.parkinson@canterbury.ac.nz](mailto:luke.parkinson@canterbury.ac.nz)

## Contributions

There is no current expectations of contributions to this project. We accept input in code reviews now. The Geospatial
Web Framework that is being created alongside this project will be opened to the public in the coming months. We will
accept contributions to that project in the future.

## License

[MIT](https://LukeParky/gri-earthquake/blob/master/LICENSE)