const dev = {
  AUTH0_DOMAIN: "dev-dye9-qv5.eu.auth0.com",
  AUTH0_CLIENTID: "RNJDKHjLMMqnQE7qZ5GiC1IkgBLK0Bge",
  AUTH0_AUDIENCE: "http://localhost",
  CLIENT_URL: "http://localhost:3000",
  SERVER_URL: "http://localhost:3001",
};

const prod = {
  AUTH0_DOMAIN: "dev-dye9-qv5.eu.auth0.com",
  AUTH0_CLIENTID: "RNJDKHjLMMqnQE7qZ5GiC1IkgBLK0Bge",
  AUTH0_AUDIENCE: "https://insulution-web.herokuapp.com",
  CLIENT_URL: "https://insulution-web.herokuapp.com",
  SERVER_URL: "https://insolution-prod.herokuapp.com",
};

export const config = process.env.REACT_APP_ENV === "production" ? prod : dev;
