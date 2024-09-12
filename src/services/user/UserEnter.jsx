import instance from "../../utils/Axios";

export const UserEnter = async (value) => {
    try {
        console.log('Received data:', value);

        const response = await instance.post('/signup', value, {
            withCredentials: true  // Allow cookies for session or authentication
        });

        console.log('Response from server:', response);
        return response.data;  // Return the response data
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};


export const UserLoginIn=async(value)=>{
    try{
        console.log('recieved data',value)
        const response=await instance.post('/login',value,{
            withCredentials:true
        })
        console.log('Response from server',response)
        return response.data
        
    }catch(error){
        console.error('error during login',error)
        throw error
    }
}