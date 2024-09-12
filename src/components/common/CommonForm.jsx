import React from 'react';
import { Controller } from 'react-hook-form';

export default function CommonForm({ title, fields, buttonLabel, onSubmit, control }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <Controller
                name={field.name}
                control={control}
                rules={field.rules}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <input
                    type={field.type}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${field.error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  />
                )}
              />
              {field.error && <p className="text-red-500 text-sm mt-1">{field.error}</p>}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            {buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
