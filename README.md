# Dreamstate Assessment Test

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Demo Credentials](#demo-credentials)
- [Contributing](#contributing)
- [License](#license)

## Description

This project is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript. It provides features for user authentication, including email/password login and Google login. Users can view a homepage with a simple photo only accessible to logged-in users.

## Prerequisites

- Node.js
- npm
- MongoDB

## Features

- User authentication with email/password and Google login
- Homepage with photo display for logged-in users
- Dynamic header button (login/logout) based on user status

## Technologies Used

- **Frontend:**

  - React
  - TypeScript
  - HTML/CSS
  - Tailwind CSS
- **Backend:**

  - Node.js
  - Express.js
  - TypeScript
  - MongoDB (with Mongoose for object modeling)
- **Authentication:**

  - JSON Web Tokens (JWT) for authentication
  - Google OAuth integration using the direct API call
- **Development Tools:**

  - npm (Node Package Manager)
  - Git

## API Documentation

[https://documenter.getpostman.com/view/23180955/2s9YytfLWK](https://documenter.getpostman.com/view/23180955/2s9YytfLWK "Postam API doc")

## Demo Credentials

This project doesn’t have a user registration feature, so we have a demo user for now.

```
{
    "email": "reza@gmail.com",
    "password": "rezaPass"
}
```


Still, we can create new users using the API endpoint.

`POST: /api/v1/users`

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes thoroughly.
5. Commit your changes.
6. Push to your branch.
7. Submit a pull request.

We appreciate your contributions!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
