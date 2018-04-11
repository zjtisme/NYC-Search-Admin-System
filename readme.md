<h4>Application Description:</h4>
<p>This web app is designed and implemented for users who want to search local 
news and information of NYC. Besides, users can log in and sign up. When 
user is at his/her own account, he/she can modify settings or log out! In addition, user could
customize their search preference when they log in.</p>
<p>Admin could log in, sign up, configure settings like normal users, however, 
when admins log in, they will see the entire registered users and their personal info.
Besides, admin has right to add user, modify user, delete user and search user by username.</p>
<p>For security reasons, I applied Bcrypt encryption for my backend and encypted the password
in the database. Besides, I also used secure-ls to encrypt my localstorage data, which makes the
whole system much safer.</p>
<h4>App Start Instruction:</h4>
<p>Make sure to run build.gradle first to set up springboot environment, and type
"npm install" inside nyc-search-ui to install all dependencies.</p>
<p>Once you have docker on your computer and would be better to have
docker-compose CLI installed, you can just spin up the whole system
by typing "docker-compose up" inside the project folder. When docker-compose inlitialization
gets done, you can type "http://localhost:3000" to play with this app.</p>
<p>Also, you could access the endpoint of my website by typing "http://tony-zhang.s3-website-us-west-1.amazonaws.com"
on your browser. And you can access my eureka registry by visiting "http://ec2-52-33-64-192.us-west-2.compute.amazonaws.com:8761"</p>
<h4>App Test Instruction:</h4>
<p>Run full tests is simple, just type "./gradlew allTests" inside project folder 
to fire up the whole testing procedure.</p>
<p>Bonus point: Run react component tests by typing "npm test" inside nyc-search-ui folder.</p>

       