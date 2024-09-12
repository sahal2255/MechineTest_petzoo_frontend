// services/admin/AdminEnter.js
import Instance from "../../utils/Axios";

export const AdminEnter = async (value) => {
    try {
        console.log('Received form details:', value);

        console.log('Axios Request');
        const response = await Instance.post('/admin/login', value, {  
            withCredentials: true
        });
        console.log('Response from server:', response);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
}


export const AdminLogout = async()=>{
    try{
        const response=await Instance.post('/admin/logout',)
    }catch(error){
        console.log('logout error',error);
        
    }
}