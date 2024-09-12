import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CommonForm from '../../components/common/CommonForm';
import { UserEnter } from '../../services/user/UserEnter';
import { useNavigate } from 'react-router-dom';

export default function UserSign() {
    const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        userName:'',
        email: '',
        password: '',
        phoneNumber:''
      }
    });
    const navigate=useNavigate()

    const handleUserSignUp = async(data) => {
        console.log('User Signed Up:', data);
        try{
          const response=await UserEnter(data) 
          console.log('user singup ',response);
          navigate('/')
          
        }catch(error){
          console.log('signup error',error);
          
        }
    };

    const fields = [
        {
            label: 'User Name',
            type: 'text',
            name: 'userName',
            rules: { required: 'User Name is required' },
        },
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
        {
          label: 'Phone Number',
          type: 'tel', // Change type to 'tel' for phone numbers
          name: 'phoneNumber',
          rules: { required: 'Phone Number is required' }, 
      },
    ];

    return (
        <CommonForm
            title="User Signup"
            fields={fields.map(field => ({
                ...field,
                error: errors[field.name]?.message
            }))}
            control={control} 
            onSubmit={handleSubmit(handleUserSignUp)}
            buttonLabel="Submit"
        />
    );
}
