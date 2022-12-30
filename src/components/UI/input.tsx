import TimezoneSelect from "react-timezone-select";
import React from "react";

type InputProps = {
  name: string;
  type?: string;
  value?: {};
  onChange?: any;
};

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props: InputProps, ref: any) => {
  const { name, type = "text", value = {}, onChange } = props;
  if (type === "checkbox") {
    return (
      <div className="mt-4">
        <input
          ref={ref}
          id={name}
          type={type}
          className="mr-2 rounded border-2 border-transparent bg-gray-200 p-2 text-gray-900 caret-red-600 accent-red-600 hover:border-red-600 focus:border-red-600 focus:outline-0"
        />
        <label htmlFor={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
      </div>
    );
  } else if (type === "timezone") {
    return (
      <div className="flex flex-col pt-4">
        <label htmlFor={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        <TimezoneSelect
          id={name}
          // @ts-ignore
          value={value}
          onChange={onChange}
          className="rounded border-2 border-transparent bg-gray-200 p-2 text-gray-900 caret-red-600 hover:border-red-600 focus:border-red-600 focus:outline-0 md:w-72"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col pt-4">
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        ref={ref}
        id={name}
        type={type}
        step="any"
        className="rounded border-2 border-transparent bg-gray-200 p-2 text-gray-900 caret-red-600 hover:border-red-600 focus:border-red-600 focus:outline-0 md:w-72"
      />
    </div>
  );
});

export default Input;
