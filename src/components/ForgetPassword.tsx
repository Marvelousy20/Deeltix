import React from 'react';
import { MoveLeft } from 'lucide-react';
import { Button } from './ui/button';
import InputField from './ui/InputField';

export default function ForgetPassword() {
  return (
    <div className="flex w-9/12 bg-white rounded-lg">
      <div className="w-1/2 p-10">
        <div className="mb-6 flex gap-1 text-lg text-[#565D62] items-center">
          <MoveLeft />
          <p>Go back</p>
        </div>
        <h1 className="text-3xl font-bold">Forget password</h1>
        <form>
          <InputField
            title="Email address"
            placeholder="johndoe@gmail.com"
            id="email"
            type="string"
          />

          <Button className="text-white" variant="primary">
            Reset password
          </Button>
        </form>
      </div>
      <div className="rounded-r-lg w-1/2 bg-[url('/signup-rest.png')] bg-cover bg-no-repeat bg-center"></div>
    </div>
  );
}
