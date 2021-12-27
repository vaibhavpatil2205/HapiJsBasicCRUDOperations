'use strict';

const Hapi = require('@hapi/hapi');
const hapiSwagger = require('hapi-swagger');
const inert = require('@hapi/inert');             // require modules
const vision = require('@hapi/vision');
const pack = require('./package.json');

const init = async () => {

    const server = Hapi.server({
        port: 1000,
        host: 'localhost'
    });

    await server.register([inert,vision,{                //hapiswagger plugin / register
        plugin: hapiSwagger,
        options: {
            info:{
                title: "Test Api Documentation",
                version : pack.version,
            }
        }
    }])

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        },
        options: {
            tags: ["api"],
           
        }
    });

    server.route({
        method: 'POST',
        path: '/',
        handler: (request, h) => {

            return "You have made post request";
        },
        options: {
            tags: ["api"],
           
        }
    });

    server.route({
        method: 'PUT',
        path: '/',
        handler: (request,h) =>{
            return "Updating ";
        },
        options: {
            tags: ["api"],
        }
    });

    server.route({
        method: 'DELETE',
        path: '/',
        handler: (request,h) =>{
            return "Deleted";
        },
        options: {
            tags: ["api"],
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();