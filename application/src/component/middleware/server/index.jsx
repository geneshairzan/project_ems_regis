import auth from "./auth";
import header from "./header";
import { Md5 } from "ts-md5";

const middlewareChain = (handler) => async (req, res) => {
  // Compose middleware functions in the desired order

  if (!res.getHeader("Access-Control-Allow-Origin")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  let x = req.headers["x-access-x"];
  let y = req.headers["x-access-y"];
  let checkshum = Md5.hashStr("w}5opZ%3oIQ6Vq(PUsTL" + y);

  if (checkshum != x) {
    return res.status(401).json("no auth");
  }

  return header(auth(handler))(req, res);
};

// export default serverMiddleware;
export default middlewareChain;
