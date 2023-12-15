steps to deploy on nginx:

---remove default settings
    sudo rm /etc/nginx/sites-enabled/default
---create a new site settings
    sudo nano /etc/nginx/sites-available/node
---paste the below code
    server {
    listen 80;
    server_name example.com;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         "http://127.0.0.1:1337";
    }
}
---add the above settings to  sites enabled
    sudo ln -s /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node

--- restart nginx
    sudo service nginx restart
