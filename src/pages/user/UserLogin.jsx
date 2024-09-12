import React from 'react';
import { useForm } from 'react-hook-form';
import CommonForm from '../../components/common/CommonForm';
import { UserLoginIn } from '../../services/user/UserEnter';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const navigate=useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm(
    {
      defaultValues:{
        email:'',
        password:''
      }
    }
  );

  const handleLogin = async(data) => {
    console.log('User Logged In:', data);
    try{
      const response=await UserLoginIn(data)
      console.log('user login in ',response);
      navigate('/')
      
    }catch(error){
      console.log('error',error);
      
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
      title="User Login"
      fields={fields.map(field => ({
        ...field,
        error: errors[field.name]?.message
      }))}
      buttonLabel="Log In"
      onSubmit={handleSubmit(handleLogin)}
      control={control}
    />
  );
}
