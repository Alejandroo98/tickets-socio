import { genSalt, hash as _hash, compare } from 'bcrypt';
const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await genSalt(10);
  const hash = await _hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  return await compare(password, savedPassword).then((res)=> {return true}).catch(()=>{
    return false
  })
};

export default helpers;
