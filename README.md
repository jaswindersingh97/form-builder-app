<h1 align="center" id="title">Form Builder</h1> <p align="center"><img src="https://socialify.git.ci/jaswindersingh97/form-builder-app/image?font=Raleway&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Overlapping+Hexagons&amp;stargazers=1&amp;theme=Dark" alt="project-image"></p> <p id="description">A MERN stack-based application allowing users to create, manage, and organize custom forms efficiently.</p> <h2>🚀 Demo</h2>
https://form-builder-app-cyan.vercel.app/

<h2>🧐 Features</h2>
Here are some of the project's key features:

User authentication: Register and log in to manage forms.
Create and edit forms with customizable fields and placeholders.
Organize forms into folders for better management.
Delete individual forms or entire folders.
View and manage submission data for each form, including user names and email addresses.
Desktop and mobile-responsive designs for forms.
Desktop-only landing page for showcasing the application.
<h2>🛠️ Installation Steps</h2> <p>1. Clone the repository:</p>
bash
Copy code
git clone https://github.com/jaswindersingh97/form-builder-app.git
cd form-builder-app
<p>2. Set up the backend:</p>
bash
Copy code
cd backend
<p>3. Install backend dependencies:</p>
bash
Copy code
npm install
<p>4. Create a <code>.env</code> file and add the following environment variables:</p>
env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SECRET_KEY=24charactersecretkey
<p>5. Start the backend server:</p>
bash
Copy code
npm run dev
<p>6. Set up the frontend:</p>
bash
Copy code
cd ../client
<p>7. Install frontend dependencies:</p>
bash
Copy code
npm install
<p>8. Create a <code>.env</code> file and add the following environment variable:</p>
env
Copy code
VITE_API_URL=http://localhost:5000
<p>9. Start the frontend development server:</p>
bash
Copy code
npm run dev
<h2>💻 Built With</h2>
Technologies used in the project:

MongoDB
React.js
Express.js
Node.js
CSS
JSON Web Tokens (JWT)
Joi
Axios
