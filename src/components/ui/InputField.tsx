import React from 'react';

function InputField({title, placeholder, id, type}:any) {
  return (
    <div className="mb-6 mt-8">
      <label
        htmlFor={id}
        className="block mb-2  text-sm font-medium text-[#565D62] dark:text-white text-left"
      >
        {title}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
      {type === 'password' && <p className="mt-3 text-sm leading-6 text-gray-600">Password must contain a minimum of 8 characters</p>}
      {/* {type === 'password' && <p className="mt-3 text-sm leading-6 text-gray-600">Password must contain a minimum of 8 characters</p>} */}
    </div>
  );
}

export default InputField;
