import instance from "../../utils/Axios";

export const PetAdoption=async(value)=>{
    try{
        // console.log(value);
        
        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('age', value.age);
        formData.append('breed', value.breed);
        console.log('image found',value.file);
        
        if (value.image && value.image.length > 0) {
            console.log('Appending image:', value.image[0]);
            formData.append('image', value.image[0]); // Assuming value.image is an array
        } else {
            console.log('No image file provided');
        }

        console.log('Appended FormData:');
        formData.forEach((value, key) => {
            console.log(key, value);
        });;
        const response = await instance.post('/petsadoption', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        console.log('res', response);
        return response
        
    }catch(error){
        console.log('service section error',error)
    }
}


export const AdoptedPetGet=async()=>{
    try{
        const response=await instance.get('/adoptedpetget')
        return response.data
    }catch(error){
        console.log('error',error);
        
    }
}