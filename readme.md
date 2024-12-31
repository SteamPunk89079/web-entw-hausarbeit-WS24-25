

<< ./frontend/dist - BUILD FOLDER >>

**npm run build** - installs dependencies (node_modules) + runs esbuild on all the .mjs files + runs lessc on .less files + runs semistandard on all .mjs files + creates frontend/dist folder 

**npm run start** - starts server on designated port "npm run start [port_nr]" 
                    starts backend/server.mjs on default port 8080 if not specified
                    "open http://localhost:8080" in browser afer running command 

**npm run debug** - installs possible dependencies options and automatically executes "npm run build"

**npm run close:ports** - script for closing ports (optional) closes all ports 
                            *code is outsorced* 