# Vocabulary Flashcards Built with React.js

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Use

### Vocabulary Database

- All vocabulary words are stored in JSON format. Below is an example:

```json
{
    "vocabularies": [
        {
            "vocabulary": "passerby",
            "partOfSpeech": "n.",
            "chinese": "路人"
        }
    ]
}
```

### Loading the Vocabulary Database

- The vocabulary categories are mapped in `categoriesMapping.js`.

```javascript
export const categoriesMapping = {
  Book1: [
    { label: 'Lesson 1', link: '../json/B1 L1.json' },
    { label: 'Lesson 2', link: '../json/B1 L2.json' },
    { label: 'Lesson 3', link: '../json/B1 L3.json' },
    { label: 'Lesson 4', link: '../json/B1 L4.json' },
    { label: 'Lesson 5', link: '../json/B1 L5.json' },
    { label: 'Lesson 6', link: '../json/B1 L6.json' },
    { label: 'Lesson 7', link: '../json/B1 L7.json' },
    { label: 'Lesson 8', link: '../json/B1 L8.json' },
    { label: 'Lesson 9', link: '../json/B1 L9.json' },
    { label: 'Review 1', link: '../json/B1 review 1.json' },
    { label: 'Review 2', link: '../json/B1 review 2.json' },
    { label: 'Review 3', link: '../json/B1 review 3.json' },
  ],
};
```

- `Book1` represents a chapter.
- Each `label` corresponds to a lesson.
- Each `link` provides the source file.

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

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## PageSpeed Insights

![alt text](image.png)


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
