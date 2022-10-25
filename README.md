<<<<<<< HEAD
# first-edit

=======
<h1 align="center">E Commerce</h1> 

<h2 align="center">It's a MERN Stack E-commerce web application with all the major functionalities</h2>

<br />
<p align="center">
    <img src="https://img.shields.io/badge/React_(17.0.2)-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactjs" />
    <img src="https://img.shields.io/badge/Redux_(4.1.1)-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="redux" />
    <img src="https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white"/>
    <img src="https://img.shields.io/badge/Rest_API-02303A?style=for-the-badge&logo=react-router&logoColor=white" alt="restAPI"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="css3"/>   
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="expressjs"/>
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb"/>
</p>

<h3 align="center"><a href="https://sagar-e-commerce.vercel.app/"><strong>Want to see live preview »</strong></a></h3>

<p align="center"> 
    <br />&#10023;
    <a href="#Demo">View Demo</a>   &#10023;  
    <a href="https://github.com/Sagar-Gondage/e-commerse-app/issues">Report Bug</a>    &#10023;
    <a href="#Getting-Started">Getting Started</a> &#10023; <a href="#Install">Installing</a> &#10023;    
    <a href="#Contact">Author</a> &#10023;
  </p>
  
  E-Commerce is a website where user can buy Fashion products for Men, Women and Children category. This is a Individual
  Project was build over the span of 2 months.Full Integration of Front-End and Backend Technologies is done. Build with MERN Stack.  
 
    
  <br />
  
  ## Screens ( All screens are responsive)
   - Homepage
   - Product Listing Page with Filters
   - Product Description Page
   - Cart Management
   - Checkout - Address Management
   - Login / Logout
   - Signup

  <br />


## 🚀 Features
- Login/Signup User Account
- Product Sorting Based on Price, Ratings, Namings
- Product Filters Based on Gender, Category, Grid View
- Products Pagination (Default 6 Products Per Page)
- Products Pagination Change Button (can set 4 products, 6 products or 8 products per page)
- Wishlist Add/Remove Items
- From wishlist to directly Add-to-Cart feature
- Cart Add/Remove Items
- Cart Update Quantities
- Address Management
- Order Summary
- Order details of all ordered item
- Admin Access
- Admin Orders Page
- Admin Products Page

<br />


## Glimpses of E - Commerce 🙈 :


<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/99082133/197589485-f6494cb8-1e43-4be0-99a2-77fc01f94af3.png" alt="home" /></td>
    <td><img src="https://user-images.githubusercontent.com/99082133/197589754-06de1bc1-d674-4860-ae06-a38111593029.png" alt="login" /></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/99082133/197590043-02f6272b-6b8c-476e-bcdf-885002a46e17.png" alt="products" /></td>
    <td><img src="https://user-images.githubusercontent.com/99082133/197590087-cb7e8681-1e8b-4a22-be9f-ba0925c586a1.png" alt="product-details" /></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/99082133/197590320-4fdc101c-35b0-4c10-9d78-48b45210067b.png" alt="cart" /></td>
    <td><img src="https://user-images.githubusercontent.com/99082133/197590412-48259325-dc7f-4fce-a91a-d8e0a746a748.png" alt="checkout" /></td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/99082133/197590480-f0edcebb-685d-4635-ba77-99f36c8b0213.png" alt="place-order" /></td>
    <td><img src="https://user-images.githubusercontent.com/99082133/197590557-2dd1fcea-3185-4f88-8192-80b37f7bb080.png" alt="razorpay-integration" /></td>
  </tr>
    <tr>
    <td><img src="https://user-images.githubusercontent.com/99082133/197590196-83179f53-c5ea-4248-925a-983d174334c5.png" alt="admin-orders" /></td>
    <td><img src="https://user-images.githubusercontent.com/99082133/197590211-30d92f3c-28cb-4450-b8f9-9a94733b3c29.png" alt="admin-products" /></td>
  </tr>
</table>


<br/>


## Getting Started

This project was built using React v 17.0.2, Redux v 4.1.1, Chakra UI, CSS, JavaScript, Rest API, Node JS, Express and MongoDB. It is an e-commerce web application and for running on your local environment you should follow these guidelines.


### Prerequisites

- NPM 
- Node JS
- MongoDB

### Setup


The project repository can be found in [GitHub link](https://github.com/Sagar-Gondage/e-commerse-app) or just clone the project using this command. 


```
Using HTTPS

# git clone  https://github.com/Sagar-Gondage/e-commerse-app.git
```

+ Open terminal on your workspace with

## Install

Install NPM

Check that you have node and npm installed

To check if you have Node.js installed, run this command in your terminal:


```
node -v
```

To confirm that you have npm installed you can run this command in your terminal:


```
npm -v
```

To confirm that you have MongoDB installed you can run this command in your terminal:


```
mongo -v
```


To install all the dependences of the project, run the following command:


```
cd client

npm install

cd ../

cd server

npm install
```


To run the application got to the client folder and run the following command:

```
npm start
```

### Environment Variables

In client folder make sure you create axios instance and deloy the backend for the api. eg
`const { default: axios } = require("axios");

export const instance = axios.create({
  baseURL: "URLofDeployedBackend",
  // baseURL: "http://localhost:8080",
});`

To run this project, you will need to add the following environment variables to your .env file in server folder

`PORT`

`MONGO_URI`

`JWT_SECRET`

`RAZORPAY_KEY_ID`

`RAZORPAY_SECRET`


### Tools used on this project

- Visual Studio Code
- create-react-app template
- MongoDB compass

<br/>



## Contact

If you want to contact me, you can reach me through below handles.

[![linkedin](https://img.shields.io/badge/sagar_gondage-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)]([https://www.linkedin.com/in/m-sehrawat/](https://www.linkedin.com/in/sagar-gondage-37ba17209/))

© 2022 Sagar Gondage



## Show your support

Give a ⭐️ if you like this project! 
>>>>>>> 521aee1f1299d2556e0aa99440051606020c5592
