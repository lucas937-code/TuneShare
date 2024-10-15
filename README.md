# TuneShare - README

## Setup for development

First, ensure that you have npm and Python installed on your device.

After that is complete, run the following command from the root 
directory of this project:

```bash
pip install -r src/backend/TuneShare/requirements.txt
```

````bash
npm install -g @angular/cli
````

This will install all the needed dependencies for the django backend and Angular CLI for the frontend.

The following instructions show, how to start the development servers:

### Backend:
````bash
cd src/backend/TuneShare
````

#### Start the django server:

Windows:
````bash
py manage.py runserver
````

This will start the django server, it is reachable at [localhost:8000](http://localhost:8000).

macOS:
````bash
python3 manage.py runserver
````

### Frontend:
````bash
cd src/frontend/TuneShare
````

````bash
npm install
````

````bash
ng serve
````
This will run the Angular frontend, it is reachable at [localhost:4200](http://localhost:4200).
