import axios from 'axios'

const axiosInstances=axios.create({
    baseURL:"https://bookstore-wdxe.onrender.com",
    timeout:10000
})

// request interceptors:Handling TOken append to Headers
axiosInstances.interceptors.request.use(
    (config)=>{
        const token=sessionStorage.getItem("token")
        if(token){
            config.headers.Authorization=`Bearer ${token}`  
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

//response interceptors handling global/common error

axiosInstances.interceptors.response.use(
    (response)=>{
        console.log("response recieved");
        return response
    },
    (error)=>{
        if(error.response){
            const status=error.response.status
            if(status==401){
                console.log("Un-Authorized");
            }
            else if(status==404){
                console.log("API not found");
            }
            else if(status==500){
                console.log("server error!!");                
            }
            else if(error.request){
                console.log("Client error");   
                return error.request 
            }
            else{
                console.log("Error"+error.message);
            }
            return Promise.reject(error)
        }
    }
)


export default axiosInstances