import React from 'react';

function Categories(name: any) {
  return (
    <div className="text-primary bg-[#574DFF1A] px-4 py-3 rounded-lg max-w-fit">
      {name.name}
      </div>
  );
}

export default Categories;
