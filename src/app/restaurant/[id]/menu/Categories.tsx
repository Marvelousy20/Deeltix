import React from "react";

interface MenuProps {
  name: any;
  activeCategoryName: string | undefined;
}

function Categories({ name, activeCategoryName }: MenuProps) {
  return (
    <div
      className={`px-4 py-3 rounded-lg max-w-fit bg-[#F7F7F7] ${
        activeCategoryName === name && "text-primary bg-[#574DFF1A]"
      }`}
    >
      {name}
    </div>
  );
}

export default Categories;
