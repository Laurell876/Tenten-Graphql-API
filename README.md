# tenten-graphql-api

This is a graphql api for the tenten web application written in JS w/ nodejs. It allows users to post listings for potential tenants as well as allow tenants to view, rate and review potential listings. Tenants and Landlords are also able to contact each other via a chat system


# Running The API

- run npm i
- create a .env file in the root of the project with the follow values  
  ACCESS_TOKEN_SECRET    
  REFRESH_TOKEN_SECRET    
  MONGO_USER    
  MONGO_PASSWORD  
  MONGO_DB  


- Ensure that on the deployed branch the database url is not set to the local mongodb url