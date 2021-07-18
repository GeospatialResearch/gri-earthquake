# Client module for GRI-Earthquake
This module is a Vue.js application used to visualise geospatial data.

To install and run this module please view the instructions in the [root README](../README.md).

## NPM Scripts:
* `serve` Serve the application in a development environment
* `build` Builds the application for a production environment
* `build:harp-gl-decoder` Builds necessary decoder files for harp-gl tiling services
* `lint` Runs ESLint over the module source code and detects syntax and formatting errors.

## Directory Structure
A summary of the structure of the client module
```
client
|   # Holds all directories of the client. Also includes configuration files
|
└───decoders
|   |   # Files for running the webworker to decode tiles for mapping
|
└───dist
|   |   # Built files ready to deploy
|   └───css
|   └───js
|       
└───node_modules
|   |   # Libraries installed from NPM
|
└───public
|   |   # Static files available to be used by the webpages, not dependant on Vue.js
|
└───src
    |   # Source code for the client module. Includes entry point main.js and other source files
    └───assets
    |   |   # Static files used by Vue.js
    └───components
    |   |   # Reusable Vue Components. One or many components can make a webpage
    └───mixins
    |   |   # Code reused and mixed into multiple components
    └───pages
    |   |   # Components specific to one page of the app
    └───store
        |   # The VueX store, used to hold application state
    
```
