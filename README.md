# Fasting24
## Table of Contents
  1. [Quick Start](#quick-start)
  1. [Built With](#built-with)
  1. [Directory Structure](#directory-structure)
  1. [Glossary](#glossary)
## Quick Start

- Clone repo
```bash
    # clone the repo
    $ git clone git@github.com:kadirosmanust/fasting24.git

    # go into app directory
    $ cd fasting24
```

- Package installation
```bash
    # install app dependencies with pnpm
    # if it's not installed. run $npm install -g pnpm
    $ pnpm install
```
- Husky setup
```bash
    # install husky with pnpm (It runs preinstall)
    $ pnpm prepare 
```

#### Environment
- Create `.env` file
```bash
    $ touch .env
```

- Add environment variables into `.env` file
```bash
   VITE_BASE_API_URL="http://localhost:7333/api/v1/"
```
#### Usage
- Start
```bash
    # start application with hot reload at http://localhost:5173/
    $ pnpm dev
```
#### Build
- Run `build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
    # build for production with minification
    $ pnpm build
```
## Built With
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)

## Directory Structure
```
Fasting24
├── src/                #project root
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── lib/s
│   ├── locales/
│   ├── pages/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   ├── imain.tsx
│
└── package.json
```
## Glossary
- `.eslintrc.cjs`: Sets the default lint rules for quality of codebase.

- `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

- `package.json`: Sets project's package dependencies and scripts etc. for managing project environment

- `.prettierrc`: Sets the default standarts for making your codebase beautiful