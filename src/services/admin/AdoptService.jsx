import instance from "../../utils/Axios"

export const AdminAdoptPet=async(data)=>{
    try{
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('age', data.age);
        formData.append('breed', data.breed);
        console.log('image found',data.file);
        
        if (data.image && data.image.length > 0) {
            console.log('Appending image:', data.image[0]);
            formData.append('image', data.image[0]); // Assuming value.image is an array
        } else {
            console.log('No image file provided');
        }

        console.log('Appended FormData:');
        formData.forEach((data, key) => {
            console.log(key, data);
        });;
        const response = await instance.post('/admin/adoptpet', formData, {
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


export const AdoptRequests=async()=>{
    try{
        const response=await instance.get('/admin/adoptionrequests')
        console.log('adoption response',response);
        
        return response.data
    }catch(error){
        console.log('error',error)
    }
}

export const updateAdoptionStatus = async (id, status) => {
    try {
      const response = await instance.put(`/admin/adoptionrequests/${id}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  };