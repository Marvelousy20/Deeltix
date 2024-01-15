import React from 'react';
import InputField from './ui/InputField';
import { Button } from './ui/button';

export default function Signin() {
  return (
    <div className="flex w-9/12 bg-white rounded-lg">
      <div className="w-1/2 p-10">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <form>
          <InputField
            title="Email address"
            placeholder="johndoe@gmail.com"
            id="email"
            type="string"
          />
          <InputField
            title="Password"
            placeholder="Password"
            id="fullName"
            type="password"
          />

          <div className="text-sm flex gap-1 mb-6">
            <p className="text-sm leading-6 text-gray-600">
              Can’t remember your password?{' '}
              <span className="text-blue-500">Reset here</span>
            </p>
          </div>

          <Button className="text-white" variant="primary">
            Sign in
          </Button>
        </form>
      </div>
      <div className="rounded-r-lg w-1/2 bg-[url('/signup-rest.png')] bg-cover bg-no-repeat bg-center"></div>
    </div>
  );
}
