- Create a Vite + React project
- Remove unnecessary code and create a Helllo World app
- Install Tailwind css
- Install Daisy UI
- Add Navbar component to App.jsx
- Create a Navbar.jsx seperate component
- Install react router dom
- Create BrowserRouter > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a Footer Component
- Create a Login Page
- Install Axios
- CORS - install cors in backend => add middleware to with configuration: origin, credentials:true
- Whenever you're making API call so pass axios => { withCredentials: true }
- Install react-redux + @reduxjs/toolkit => configure store => Provider => Create a Redux State Slice => add reducer to store
- Add redux devtools extension to chrome
- login and see if your data coming properly in the store
- navbar should update as soon as user logs in 
- Refactor our code to add constants file + create a components folder
- You should be access other routes without login
- If token is not present redirect user to login page


- SignUp on AWS
- Launch instance
- chmod 400 <secret> .pem  i.e chmod 400 "devTinder-secret.pem"
- ssh -i "devTinder-secret.pem" ubuntu@ec2-52-66-238-245.ap-south-1.compute.amazonaws.com
- Install exact node version as local
- git clone
- FRONTEND (go to your frontend applicatio folder like cd Johaar-DevTinder-Frontend-MS)
    -npm install -> (install dependencies)
    -npm run build
    -sudo apt update
    -sudo apt install nginx
    -sudo systemctl start nginx
    -sudo systemctl enable nginx
    -copy code from dist (build files) to var/www/html/ 
    -sudo cp -r dist/* var/www/html/
    -enable port: 80 of your instance
- BACKEND
    - updated DB Password
    - (White Listing Server) allowed ec2 instance public IP addredd on Atlas MongoD server
    - npm install pm2 -g becuase in production we dont run npm run start (because when we close the terminal the server down's)
    - pm2 start npm -- start || pm2 start npm --name "devTinder-backend" -- start
    - pm2 log [pm2 logs devTinder-backend (note: plural 'logs', not 'log') to see just that one process's output]
    - pm2 list [Shows a table of every process pm2 is currently managing],
    - pm2 flush <name of the process i.e npm here>, 
    - pm2 stop <name of the process> [Stops the process but keeps it in pm2's list (so you can start it again later with 'pm2 start devTinder-backend' or 'pm2 restart devTinder-backend'). Command: pm2 stop devTinder-backend], 
    - pm2 delete <name of the  process> 
    - config nginx -> etc/nginx/sites-available/default  i.e sudo nano etc/nginx/sites-available/default
    - Save the file (Ctrl+O, then Enter)
    - Exit nano (Ctrl+X) 
    - sudo nginx -t (To check for syntax errors || Test the config for errors)
    - restart nginx i.e sudo systemctl restart nginx


#  Nginx Config :

    Frontend = http://15.207.249.235/
    Backend  = http://15.207.249.235:7777/

    Domain name = devtinder.com => 15.207.249.235

    Frontend = devtinder.com
    Backend  = devtinder.com:7777 => devtinder.com/api   (we say it proxy pass /api to 7777)

    

        server_name 15.207.249.235;   (after server_name basically the domain name should be written i.e devtinder.com but as of now we don't have domain name so we  passed as 15.207.249.235) by default it was like  server_name _;

        location /api/ {
            proxy_pass http://localhost:7777/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        
