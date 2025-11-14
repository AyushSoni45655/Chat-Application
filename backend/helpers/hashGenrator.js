import bcrypt from 'bcrypt';

const hashGenrate = async(password)=>{
  try{
     const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);
  return hash;
  }catch(e){
    console.log("HashGenrating error",e);
    
  }
 
}
export default hashGenrate;