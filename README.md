## Application Details

This project impliments a Mongodb database in the backend running on
Node.JS. The front end is handled with React, the framework I utilize
throughout the application is axios, and I interface with the Spotify API. 

The purpose of this web application is to allow users to:
    1. Login with their spotify account
    2. Search through the Spotify db for different artists
    3. Display information that isn't commony accessable about the artists
        including their follower count, popularity index, and main genre.
    
The webpages I utilize are a DB log page (in the backend) and a react component
page on the front end that responds to user input.

The Database stores a log of the user IDs of the individuals who have accessed
this webpage and successfully logged in. The Database runs locally on port 5000 and the 
front end locally on port 3000.

NOTE: THIS APPLICATION ONLY WORKS IF YOU HAVE A VALID SPOTIFY ACCOUNT AND ALL NODE FILES HAVE BEEN REMOVED DUE TO SIZE. INSERT BACKEND AND SRC INTO FRESH BUILD WITH APPROPRIATE REFERENCES.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
