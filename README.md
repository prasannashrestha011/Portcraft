# Portcraft

A web-based portfolio builder that allows users to create and customize their personal portfolios easily. Built with Next.js and modern UI components.

## 🚀 Live Demo

Check out the live version: [https://portfolio-builder-phi-three.vercel.app/](https://portfolio-builder-phi-three.vercel.app/)

## ✨ Features

- 🧠 **AI-Powered Code Generation (Gemini API)**  
  Integrated with Google's Gemini API to intelligently generate, refactor, and autocomplete code based on your prompts.

- 🖥️ **Live Code Preview**  
  See instant output as you write HTML, CSS, and JavaScript. Great for building and testing UI components on the fly.

- 🔗 **Sharable Workspace**  
  Share your code and live preview via a unique URL. Perfect for collaboration or showcasing snippets.

- 💾 **Save and Export**  
  Save sessions in the cloud.

## 🛠️ Tech Stack

![Alt text](https://skillicons.dev/icons?i=next,react,typescript,tailwind,zustand)

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
git clone https://github.com/prasannashrestha011/PortfolioBuilder.git
cd PortfolioBuilder
npm install
npm run dev
```

## Environment Variables

| Variable              | Description                            | Example                                                                                  |
| --------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------- |
| API_URL               | Gemini api url                         | https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent |
| API_KEY               | Gemini api key                         | YOUR_API_KEY                                                                             |
| ROOT_URL              | Project root url                       | https://portfolio-builder-phi-three.vercel.app/                                          |
| FIREBASE_ADMIN_KEYS   | firebase credential                    | {type:"service account",project_id:"",..}                                                |
| DROPBOX_API_KEY       | id for your application                | nxx131ab5kx(example id)                                                                  |
| DROPBOX_API_SECRET    | password of your application           | ox**\***                                                                                 |
| DROPBOX_ACCESS_TOKEN  | authentication token                   | sl.u.**\*\***                                                                            |
| DROPBOX_REFRESH_TOKEN | one time token to refresh access token | br\_....                                                                                 |
| NEXT_PUBLIC_ROOT_URL  | public domain                          | https://portfolio-builder-phi-three.vercel.app/                                          |

```

```

# API Documentation

## Authentication

This project uses **Firebase Authentication** with Google as an OAuth provider to enable users to sign in securely.

### How It Works

- Users click the "Sign in with Google" button.
- Firebase triggers the Google OAuth flow.
- Upon successful sign-in, Firebase returns a user credential object.
- The app uses this credential to authenticate the user and access user info.

For implementation details, see the official [Firebase Google Sign-In guide](https://firebase.google.com/docs/auth/web/google-signin).

## `/api/session` - Authenticate and Set JWT Cookie

**Method:** `POST`

### Request Body

| Field   | Type   | Description                                              |
| ------- | ------ | -------------------------------------------------------- |
| idToken | string | Firebase ID token from client after Google OAuth sign-in |

### Response

| Status | Body                           | Description                                                                |
| ------ | ------------------------------ | -------------------------------------------------------------------------- |
| 200    | `{ message: "Authenticated" }` | JWT cookie is set in the HTTP response headers                             |
| 401    | `{ error: "Invalid token" }`   | Firebase ID token verification failed,user get redirect to the /login page |

## `api/session/logout`-Logging off credentials

**Method:** `GET`
In this route we will only clear off the cookie provided from our app,as firebase already handled the signout method

## Response

response.cookies.set"session","",{expires:new Date(),path:"/"});
| Status | Description |
|--------|----------------------------------|
| 200 | Successfully logout |

## `/api/prompt` - Submit Combined Prompt to Gemini API

**Method:** `POST`

### Request Body

| Field  | Type   | Description                                                               |
| ------ | ------ | ------------------------------------------------------------------------- |
| prompt | string | Detailed prompt combined with user information to generate portfolio code |

## `/api/prompt` -Route to save data on cloud

**Method:** `GET`

## Request body

| Field  | Type   | Description                        |
| ------ | ------ | ---------------------------------- |
| prompt | string | path to read saved code from cloud |

## Response

| Status | Description                             |
| ------ | --------------------------------------- |
| 200    | Successfully retrieved saved code       |
| 400    | Bad request (missing or invalid prompt) |

**Method:** `POST`

| Field    | Type           | Description                                                 |
| -------- | -------------- | ----------------------------------------------------------- |
| fileName | string         | default file name to be saved                               |
| filePath | string         | custom filePath will be modiefied to make it as unique path |
| file     | multipart data | blob file                                                   |
| userID   | string         | unique identifier of user                                   |

# Response

| Status | Description                                     |
| ------ | ----------------------------------------------- |
| 200    | {name:"",lower_path:""}                         |
| 400    | Bad request (missing file content,name or path) |

**Method:** `DELETE`
| Field | Type | Description |
|--------|--------|----------------------------------------------------------|
| path | string | unique path to the file |

# Response

| Status | Description                              |
| ------ | ---------------------------------------- |
| 200    | {message:"file deleted"}                 |
| 400    | {message:"missing file path"             |
| 500    | {message:"unknow error while processing" |
