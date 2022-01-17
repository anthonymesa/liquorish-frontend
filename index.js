
"use strict";

//  Hapi allows us to define our server-api as an object
const Hapi = require("hapi");

//  This is const so that the value of this function is asynchronously
//  evaluated at "compile time".
const init = async () => {

  //  Create server object
  const server = new Hapi.Server({ port: 8080 });

  //  Inert module is required because are responding to GET with a static
  //  local webpage.

  await server.register({
    plugin: require('inert')
  })

  //  The path '/{path*}' ensures that all paths/chars that are tacked on
  //  to the end of the app's url are treated like the same url.
  //  
  //  The folder for the webpage to be served is in the './www' directory,
  //  where there should be a corresponding index.html.
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
    directory: {
          path: './www',
          listing: false,
          index: true
        }
    }     
  });

  //  Start the configured server synchronously
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});