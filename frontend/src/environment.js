// let IS_PROD = true;
// const server = IS_PROD ? "https://myportfolio-7tjb.onrender.com" :
             
//     "http://localhost:3000"

// export default server;

const servers = {
  dev: "http://localhost:3000",
  prod: "https://myportfolio-7tjb.onrender.com"
};

const server =
  import.meta.env.PROD ? servers.prod : servers.dev;

export default server;
