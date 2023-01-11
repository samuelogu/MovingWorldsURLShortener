# MovingWorlds URL Shortener API

This is a simple URL-shortening API service to enable users generate custom URLs for their long URLs. Feel free to send a pull request 😁

## Installation & Setup ##

If you dont't have an existing server; You could get $100 in credit over 60 days from Digitalocean to deploy this. Signup [here](https://m.do.co/c/d37ac183123b).

`git clone https://github.com/samuelogu/MovingWorldsURLShortster.git`

`cd api`

`npm i`

`touch .env`

You will need to have [Mongodb](https://docs.mongodb.com/manual/installation/) installed on your local machine or a cloud based instance to use the connector. Update the `.env` file.

```javascript
DATABASE_URL=mongodb://localhost:27017/MovingWorlds
PORT=3000
BASE_URL=http://localhost:3000
```

Start your server with `npm start` and you are ready to start building
