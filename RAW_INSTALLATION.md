# Steps to run this project - <br>

## Installing and running flask application. <br>

In order to start the flask application, you must download and place the kafka setup files in the C drive. For details on how to start the kafka and zookeeper, head to the readme.md file in app directory. <br>

> cd app <br>
> virtualenv env <br>
> env/scripts/activate <br>
> pip install -r requirements.txt <br>
> flask run  <br>

## Installing and running websocket server. <br>
> cd sockets <br>
> npm install <br>
> npm start <br>

## Installing and running react based frontend application. <br>
> cd frontend <br>
> npm install <br>
> npm start <br>

### Environment variables required for flask application - <br>
> MONGO_PWD <br>
> MONGO_UID <br>
> SECRET_KEY <br>

### Environment variables required for frontend - <br>

In order to get these environment variables, head to emailjs.com and create a free account. There you can create a template and add a service by linking one of your mailing accounts to emailjs. Once you have done this, you will be able to get your Public Key from settings, template id from template settings and service id from under the registered service. <br>

> REACT_APP_EMAILJS_PUBLIC_KEY <br>
> REACT_APP_EMAILJS_TEMPLATE_ID <br>
> REACT_APP_EMAILJS_SERVICE_ID <br>