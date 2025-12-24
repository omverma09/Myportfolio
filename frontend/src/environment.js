const servers = {
  dev: "http://localhost:3000",
  prod: "https://myportfolio-7tjb.onrender.com"
};

const server =
  import.meta.env.PROD ? servers.prod : servers.dev;

export default server;
