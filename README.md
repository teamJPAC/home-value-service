# Zillgo Home Value Service

> Zillgo is a reimplementation of the Zillow's site's product page. This repo contains the "Home Value" component for that project, which fetches home information from the database, displays them to the user via a React frontend, and allows the user to interact with those reviews. Furthermore, this application has been scaled with NGINX to allow for up to 1000 users with only a 120ms delay.

## Related Projects

  - [Mortgage Service](https://github.com/teamJPAC/mortgage-service)
  - [Image Gallery](https://github.com/teamJPAC/image-gallery)
  - [Sidebar Service](https://github.com/teamJPAC/sidebar-service)

## Table of Contents

1. [Requirements](#requirements)
2. [Development](#development)

## Requirements

- Node

## Development

Clone the repo with
```git clone https://github.com/thisisjackie/home-value-service.git```

Install dependencies with
```npm i```

Seed database of choice or modify existing postGres routes

Create bundle and start server
```npm start```

Now open the browser and navigate to `http://localhost:5000` and you get the working zillgo app.

