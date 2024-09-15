import instance from "../../utils/Axios";
export const ProfileGet = async () => {
    console.log('request to the backend');
    try {
        const response = await instance.get('/profile');
        console.log('response from server', response);
        return response; // Return the response here
    } catch (error) {
        console.error('error during profile details', error); // Fixing typo: .error => , error
        throw error;
    }
};


export const AdoptionRequest=async()=>{
    try{
        const response=await instance.get('/adoptionrequests')
        return response
    }catch(error){
        console.log('request getting error',error)
    }
}