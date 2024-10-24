# GitHub User Search Application
A simple web application that allows users to search for GitHub users and view their public repositories.

## Getting Started
To get started with this project, follow these steps:

**Create Token**: 
1. Create your own token in GitHub using the follwing instractions:

`https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens`

2. create a .env file in /server folder with one attribute:
     GITHUB_TOKEN=<your-token>

    *If no token is provided, mock data will be used by default.

3. **Install Dependencies**: Run the following command to install the required packages:

```
npm install
```

4. **Start the Application**: Once the dependencies are installed, start the application from the root of the project:

```
npm start
```

5. **Visit the Application**: Open your browser and go to `http://localhost:3000/` to use the application.



