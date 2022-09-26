import { User } from "../models/user.js";

export const getUsers = async (_req, res) => {
  const users = await User.findAll().then((res) => {
    return res;
  }).catch(()=>{
    return null
  });

  if (!users) return res.status(404).json('failed query')
  res.json({ users: users });
};

export const createUser = async (req, res) => {
  console.log("req", req.body);
  const newUser = await User.create(req.body);
  console.log(newUser, "new");

  res.send("post user");
};
