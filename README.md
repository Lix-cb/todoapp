# To-do App

To-do list application built with Expo and Expo Router. Quise refactorizarlo de forma didáctica en typescript para entender cómo funcionaba.s 

## Features

- Add, edit, complete and delete tasks
- Tasks are saved locally with AsyncStorage
- Light and dark theme, saved between sessions
- Detail screen to edit a task

## Project structure

```
src/app/            Screens (Expo Router)
  _layout.tsx       Root layout with providers and navigation stack
  index.tsx         To-do list
  details/[id].tsx  Edit a task
components/         Reusable components
constants/          Colors and storage keys
context/            Theme and to-do providers
data/               Initial to-do list
hooks/              useTheme and useTodos
```

## Getting started

```bash
npm install
npx expo start
```

Then press `w` for web, `a` for Android or `i` for iOS, or scan the QR code with Expo Go.
