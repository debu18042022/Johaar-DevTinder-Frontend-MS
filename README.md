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
    - Modify the BASE_URL to "/api" to frontend project


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

        
# Adding a Custom Domain Name (GoDaddy → Cloudflare)

**Domain Name** — human-readable address for a server (e.g. `devtinders.in`)
**Registrar** — where you *buy* the domain (GoDaddy, Hostinger, Namecheap...)
**DNS** — system that maps domain → IP and stores routing rules
**Nameservers** — servers that actually *manage* your DNS records (can differ from registrar)
**DNS Record** — a rule like A (domain→IP), CNAME (domain→domain), MX (mail)

> Registrar = who you bought from. Nameservers = who controls where it points.

## Steps
1. Buy domain from any registrar.
2. Add domain in Cloudflare → get 2 nameservers.
3. In GoDaddy → Nameservers → switch to custom → enter Cloudflare's nameservers → save.
4. Wait for propagation (min–48hrs but active in ~15min) → Cloudflare shows "Active".
5. Add DNS records to point domain to your app (see below).
6. Open ports 80/443 (and your backend port, e.g. 7777) in EC2 Security Group → Source: 0.0.0.0/0.
7. Set up Nginx as reverse proxy on EC2 → forward port 80 to your pm2 app's port.
8. For React/SPA apps: fix `try_files $uri $uri/ =404;` → `try_files $uri $uri/ /index.html;` in nginx config, so direct URL loads/refreshes (e.g. `/login`) don't 404.
9. In Cloudflare → SSL/TLS → set mode to **Flexible** (if your origin server only serves plain HTTP, not HTTPS). Use Full/Full(strict) only if you've installed an SSL cert on the server itself.

## Example: AWS EC2 (frontend + backend via pm2)
| Type | Name | Content |
|---|---|---|
| A | @ | Elastic IP |
| A | www | Elastic IP |
| A | api | Elastic IP |

- Use Elastic IP (static), not default EC2 IP.
- Use Nginx to reverse-proxy pm2 app to ports 80/443.
- Keep Proxy (orange cloud) ON for free SSL.

## Common Error: Cloudflare 521 "Web server is down"
- Means: Cloudflare reached your DNS fine, but your origin server refused the connection.
- Check in order: (1) EC2 Security Group allows 80/443 from anywhere, (2) Nginx is running, (3) pm2 app is online, (4) Cloudflare SSL/TLS mode matches what your server actually supports (Flexible if origin is HTTP-only).


# Sending Emails via Amazon SES (Simple Email Service : Email Sending and Receiving Service)

    - Create an IAM user (this gives you permission to different services inside AWS)
    - Give access to AmazonSESFullAccess
        - Set permissions: select Attach policies directly (radio button) -> seacrch AmazonSES and select AmazonSESFullAccess
    - Amazon SES: create an Identity
    - Verify your email address Identity
    - Verify your domain name [devtinders.in]
        - Here will get the three CNAME records that we have to set in our DNS settings. (basically AmazonSES needs to verify that   devtinders.in is my domain)
        - Login to cloudflare -> select records under DNS -> Add record
            | Type | Name | Target |
            | ---  |---   | ---    |
            | CNAME| name | value |
            | CNAME| name | value |
            | CNAME| name | value | 
        - Turn off Proxy status
    - Production Access Request
    Now to send an email we need AWS SDK and secret access key for the same IAM user that we created in sujeet's case the name is devtinder-ses.
    - Install AWS SDK v3 : 
    - Amazon SES examples using SDK for JavaScript (v3) [code Example]:
     https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
    - Setup SES client but before that we need to install this package npm i @aws-sdk/client-ses
        sesClient.js file
        const { SESClient } = require("@aws-sdk/client-ses");
        // Set the AWS Region.
        const REGION = "us-east-1";
        // Credentials are automatically resolved using the AWS SDK credential provider chain.
        // For more information, see https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
        // Create SES service object.
        const sesClient = new SESClient({
            region: REGION,
            credentials: {
                AWS_ACCESS_KEY,
                AWS_SECRET_KEY,
            }
        });
        module.exports = { sesClient };

    - Access Credentials should be created in IAM under SecurityCredentials Tab
    - Add the Credentials to the env file
    - Write code for SESClient
    - Write code for Sending email address
    - Make the email dynamic by passing more params to the run function


