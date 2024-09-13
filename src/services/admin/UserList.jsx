import instance from "../../utils/Axios"

export const UserList=async()=>{
    try{
        const response=await instance.get('/admin/users')
        return response.data
    }catch(error){
        console.log('getting error',error)
    }
}

export const PetList=async()=>{
    try{
        const response=await instance.get('/admin/petlist')
        return response.data
    }catch(error){
        console.log('petlist errror',error);
        
    }
}