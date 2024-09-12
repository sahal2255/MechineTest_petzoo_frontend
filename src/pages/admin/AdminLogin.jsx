import React from 'react';
import { useForm } from 'react-hook-form';
import CommonForm from '../../components/common/CommonForm';
import  {AdminEnter}  from '../../services/admin/AdminEnter';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate=useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const handleAdminLogin = async(data) => {
    console.log('Admin Logged In:', data);
    try{
      const response=await AdminEnter(data)
      console.log('admin logged in',response)
      navigate('/admin/dashboard')
    }catch(error){
      console.log('eror',error);
      
    }
  };

  const fields = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      rules: { required: 'Email is required' },
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      rules: { required: 'Password is required' },
    },
  ];

  return (
    <CommonForm
      title="Admin Login"
      fields={fields.map(field => ({
        ...field,
        error: errors[field.name]?.message
      }))}
      buttonLabel="Login as Admin"
      onSubmit={handleSubmit(handleAdminLogin)}
      control={control}
    />
  );
}
