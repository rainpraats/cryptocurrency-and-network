# cryptocurrency-and-network

The frontend application is made with react.

## How to

### Start the backend:

1. Make sure that you have the config/config.env file with these fields:
   PORT,
   MONGO_URI,
   JWT_SECRET,
   JWT_EXPIRES,
2. In the terminal type: cd backend && npm run dev (or if you prefer npm run start)

### Start the frontend:

In the terminal type: cd frontend && npm run dev

### Make an account

The login page will let you sign up. By default signing up will make an account with the role user.
To make an account with the role miner or admin you need to make a http POST request to the server.

### HTTP post request Example

http://localhost:3000/api/v1/user

{

        "email": "b@b.se",
        "role": "miner",
        "password": "12345678"

}
