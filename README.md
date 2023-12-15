steps to deploy on nginx:<br>

---remove default settings<br>
    sudo rm /etc/nginx/sites-enabled/default<br>
---create a new site settings<br>
    sudo nano /etc/nginx/sites-available/node<br>
---paste the below code<br>
    server {<br>
    listen 80;<br>
    server_name example.com;<br>

    location / {<br>
        proxy_set_header   X-Forwarded-For $remote_addr;<br>
        proxy_set_header   Host $http_host;<br>
        proxy_pass         "http://127.0.0.1:1337";<br>
    }<br>
}<br>
---add the above settings to  sites enabled<br>
    sudo ln -s /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node<br>
<br>
--- restart nginx<br>
    sudo service nginx restart<br>
--- to keep running node js server in background<br>
    sudo npm install forever -g<br>
    sudo npm start app.js<br>
--- to stop running node js server<br>
    sudo npm stop app.js<br>
