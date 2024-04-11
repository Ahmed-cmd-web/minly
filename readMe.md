# Minly Software Development Engineer Take-Home Assignment

## Setup

- create a cloudinary account
- Clone the repository
- add a .env file each of the following directories
  - backend/.env
  - frontend/web/.env
  - frontend/mobile/.env
- Add the following to the .env file in the backend directory
  ```
    PORT=<server port number>
    mongoDB_URI=<Your db url>
    cloudinary_CLOUD_NAME=<your cloudinary cloud name found in dashboard>
    cloudinary_API_KEY=<your cloudinary api key found in dashboard>
    cloudinary_API_SECRET=<your cloudinary api secret found in dashboard>
  ```
- Add the following to the .env file in the frontend/web directory(note: that the backend url should be the same as the one in the backend directory):

  ```
    REACT_APP_BACKEND_URL=<backend url>
  ```

- Add the following to the .env file in the frontend/mobile directory(note that the backend url should be the same as the one in the backend directory):

  ```
    EXPO_PUBLIC_BACKEND_URL=<backend url>
  ```

- Install dependencies in each of the directories by running the following command in each of the directories
  ```
    yarn
  ```

## Running the application

1. Run the backend server by running the following command in the backend directory

```
  yarn start
```

2. Run the web frontend by running the following command in the frontend/web directory

```
  yarn start
```

3. Run the mobile frontend by running the following command in the frontend/mobile directory

```
  yarn start
```
