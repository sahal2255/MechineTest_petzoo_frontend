import React from 'react';
import { useForm } from 'react-hook-form';
import CommonForm from '../../common/CommonForm';
import { Error } from '@mui/icons-material';
import { AdminAdoptPet } from '../../../services/admin/AdoptService';

export default function AdminAdoptForm({ onAdoptSuccess }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      age: '',
      breed: '',
      image: null
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await AdminAdoptPet(data);
      console.log(response.data.message);
      const newPet = response.data.pet;

      // Call onAdoptSuccess to pass the new pet and close the modal
      onAdoptSuccess(newPet);
    } catch (error) {
      console.log('submitting error', Error);
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      rules: { required: 'Name is required' }
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      rules: { required: 'Age is required' }
    },
    {
      name: 'breed',
      label: 'Breed',
      type: 'text',
      rules: { required: 'Breed is required' }
    },
    {
      name: 'image',
      label: 'Image',
      type: 'file',
      rules: { required: 'Image is required' },
      error: errors.image?.message
    }
  ];

  return (
    <div>
      <CommonForm
        title="Adoption Form"
        fields={fields}
        buttonLabel="Submit"
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </div>
  );
}
