/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import InputField from './ui/InputField';
import { Button } from './ui/button';

export default function Signup() {
  return (
    <div className="flex w-9/12 bg-white rounded-lg">
      <div className="w-1/2 p-10">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <form>
          <InputField
            title="Full name"
            placeholder="e.g John Doe"
            id="fullName"
            type="string"
          />
          <InputField
            title="Email address"
            placeholder="johndoe@gmail.com"
            id="email"
            type="string"
          />
          <InputField
            title="Phone Number"
            placeholder="000 000 0000"
            id="phoneNumber"
            type="tell"
          />
          <InputField
            title="Password"
            placeholder="Password"
            id="fullName"
            type="password"
          />

          <div className="text-sm flex gap-1 mb-6">
            <input type="checkbox" id="scales" name="scales" />
            <label htmlFor="scales">
              I agree to DeelTix's <span className="text-blue-500">terms</span>{' '}
              and <span className="text-blue-500">conditions</span>
            </label>
          </div>

          <Button className="text-white" variant="primary">
            Create Account
          </Button>
        </form>
      </div>
      <div className="rounded-r-lg w-1/2 bg-[url('/signup-rest.png')] bg-cover bg-no-repeat bg-center">
        {/* <Image
        src={'/signup-rest.png'}
        alt="image"
        width={500}
        height={500}
      /> */}
      </div>
    </div>
  );
}
