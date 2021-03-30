# Laravel React RealTime Chat App 💬

Full Featured Chat Web App with User-to-User and User to Group Real Time chatting, Profile Picture Uploading and Notifications.
Built with React, Redux, Laravel, PostgreSQL and powered by WebSockets, hosted in Docker containers running NGINX and PHP-FPM.

Live Demo( Desktop & Tablet only, Mobile responsiveness is WIP ) at https://demos.shawndsilva.com/realtime-chat-app

## ⭐ Features

- Public chatting with all user in site.
- Create your own Chat Rooms/Channels and make them Public or Private( needing your permission or invitation to join )
- User To User Private Messaging

For complete ✨Feature List✨ screenshots and a video of the features check out https://www.shawndsilva.com/projects/laravel-react-chat.html

## ✅ Requirements

- PHP 7.2
- Composer
- NPM
- React
- PostgreSQL

A PostgresSQL service needs to be running with user, password, database name, port and hostname supplied in .env

Following are the default values provided in `.env.example`, either setup your pgsql instance with these values, or change them with your own accordingly
```
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=laravel_react_chat
    DB_USERNAME=admin
    DB_PASSWORD=123456
```

## 🚀 Quick Start

Clone the repository

```
    git clone https://github.com/shawn-dsilva/laravel-react-realtime-chat
```

Install dependencies 

```
    composer update && npm install
```

Create .env file from local development template .env

```
    cp .env.example .env
```

Make executable and run the Local Development Init script 

```
    chmod +x initlocal.sh
```
```
    ./init.sh
```

Run the app

```
    npm run all
```

## 📘 Changelog


For Changelog, TODOS and Error Notes about this project, see `TODOS.md` within this repository.


## 👨‍💻 Author 

| [<img src="https://avatars0.githubusercontent.com/u/33859225?s=460&u=797dc9181252488a9c325fca842898c24ff28688&v=4" width="150px;"/><br /><sub>Shawn D'silva</sub>](https://www.shawndsilva.com)<br /> |
| :---: |

