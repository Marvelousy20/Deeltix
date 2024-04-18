import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relativ w-full lg:max-w-[27rem] flex justify-center">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full lg:max-w-[27rem] rounded-full border border-neutral-200 bg-input px-3 py-5 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-0 pointer-events-none">
            <img src={icon} alt="icon" className="h-12 w-12" />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
