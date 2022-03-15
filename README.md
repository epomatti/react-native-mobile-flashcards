# React Mobile Flashcards

For my React Developer certification at Udacity I implemented this simple quiz game using React Native and many other technologies.

Originally in 2019 this was running on Android and I refactored it to the latest SDK versions.

## Demo

A live demo is published here: https://react-native-flashcards.pomatti.io

![](docs/demo.gif)

## Development

You'll need [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) installed for local development:

```bash
yarn global add expo-cli
```

Install the dependencies and start the project:

```bash
yarn install
yarn start
```

If you're running for the web just do:

```bash
yarn web
```

## Deployment

As per [documentation](https://docs.expo.dev/distribution/publishing-websites/#vercel):

```bash
expo build:web
```

And deploy to your favorite platform.