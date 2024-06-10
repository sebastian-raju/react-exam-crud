import axios from "axios"


export const commonRequest = async (method, url, data) => {
  try{
    const response = await axios({
      method,
      url,
      data
    });
    return response;
  }catch(error){
    return error.response
  }
}