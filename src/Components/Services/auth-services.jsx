import axios from "axios";
import { config } from "../../env-services";

const endPoint = 'auth';


const userRegister = async(data) => {
    try {
        const response = await axios.post(`${config.api + endPoint}/register`, data , {
          ...config.options,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
}



const methods = {
    userRegister
}


export default methods