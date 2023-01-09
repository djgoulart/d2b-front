<p align="center"><a href="javascript:void(0)" target="_blank"><img src="https://raw.githubusercontent.com/djgoulart/d2b-front/main/public/logo.png" width="400" alt="D2B Logo"></a></p>

## About D2B Frontend

This project is the frontend part of the [TydyDaily challenge](https://github.com/TidyDaily/developer-test). 

# Project Overview

The project was built using ReactJS and ChakraUI.

<br />

# Accessing the application

Please access the [THIS URL](https://d2b-front-djgoulart.vercel.app/) to see the frontend working.

### Admin Access:
- Login: admin@test.com
- Password: 123456

### Customer Access:
 Please create an account accessing the [SignUp page](https://d2b-front-djgoulart.vercel.app/signup).

 <br/>


# Running the application locally
- clone the repository
```bash
git clone git@github.com:djgoulart/d2b-front.git
 ```
- install the dependencies:

```bash
npm install  
```

- create a .env.local file in the project root directory with the following contents:

```js
VITE_API_URL=http://localhost/api  
```
- run the application locally:

```js
npm run dev  
```
<br />

## Challenge Details

Build a simplified banking system, using Laravel and ReactJS.
 - The system has 2 types of users.
    - [x] Customer
    - [x] Admin

## Customer Stories
 - [x] A user can create a new account with name, email and password. 
 - [x] A user starts with 0 balance.
 - [x] A user can deposit more money to his account by uploading a picture of a check and entering the amount of the check. if the check is approved by an admin, the money is added to the bank account.
 - [x] To buy something, the user enters the amount and description; a user can only buy something if she has enough money to cover the cost.
 - [x] a user can see a list of balance changes including time and description.

 ## Admin Stories
 - [x] An admin account is already created with a hard coded username and password.
 - [x] An admin can see a list of pending check deposit pictures with amount and picture and click to approve or deny the deposit.
 - [x] An admin can’t be also a customer.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
