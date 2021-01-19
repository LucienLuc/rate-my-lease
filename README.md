# rate-my-lease
A RateMyProfessor like website for leasing and housing in the Davis area created at HackDavis 2021.

# Collaborators
- [Jiu Choe](https://github.com/jiuchoe4)
- [Elliot Lee](https://github.com/eal001)
- [Pushu Zhang](https://github.com/pushuzhang)
- [Lucien Luc](https://github.com/LucienLuc)

# Set-up
1. Clone repository
2. Install `node_modules` in backend
  * In `/backend/` run `npm i`
3. Set up `.env` in backend
  * Create `.env` file in `/backend/`
  * Make the following environment variables:
  ```
  MONGODB_URI= {INSERT MONGODB URI HERE}
  PORT=8000
  GOOGLE_API_KEY = {INSERT GOOGLE API KEY HERE}
  ```
  * Replace "{INSERT MONGODB URI HERE}" with your MongoDB URI and 
  * Replace "{INSERT GOOGLE API KEY HERE}" with your Google Api key
4. Install `node_modules` in frontend
  * In `/frontend/` run `npm i`
5. Set up `.env` in frontend
  * Create `.env` file in `/frontend/`
  * Make the following environment variables:
  ```
  REACT_APP_GOOGLE_API_KEY = {INSERT GOOGLE API KEY HERE}
  ```
  * Replace "{INSERT GOOGLE API KEY HERE}" with your Google Api key
  
# Dependencies
1. MongoDB
2. Google Cloud API

# Links
[Devpost](https://devpost.com/software/rate-my-lease-dbpco3)
