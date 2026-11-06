import axiosInstances from "./axiosinstances";

const apiService=async(httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody,
        headers:reqHeader
    }
    try{
        const response = await axiosInstances(reqConfig)
        return response
    }catch(err){
        return err
    }
}

export default apiService