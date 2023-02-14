import TimezoneSelect from "react-timezone-select";
import React from "react";
import { string } from "zod";

type InputProps = {
  name: string;
  type?: string;
  value?: {} | string;
  defaultValue?: string;
  onChange?: any;
  onBlur?: any;
  options?: { name: string; value: string | number }[];
  error?: string;
};

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props: InputProps, ref: any) => {
  const {
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    options,
    error,
    defaultValue,
  } = props;
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
        {console.log(value)}
        <TimezoneSelect
          id={name}
          // @ts-ignore
          value={value}
          onChange={onChange}
          className="rounded border-2 border-transparent bg-gray-200 p-2 text-gray-900 caret-red-600 hover:border-red-600 focus:border-red-600 focus:outline-0 md:w-72"
        />
      </div>
    );
  } else if (type === "select" || type === "duration") {
    return (
      <div className="flex flex-col pt-4">
        <label htmlFor={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        <select
          id={name}
          defaultValue={value}
          // @ts-ignore

          value={value}
          onChange={(e) =>
            onChange(
              type === "duration" ? parseInt(e.target.value) : e.target.value
            )
          }
          onBlur={onBlur}
          className="rounded border-2 border-transparent bg-gray-200 p-2 text-gray-900 caret-red-600 hover:border-red-600 focus:border-red-600 focus:outline-0 md:w-72"
        >
          {options &&
            options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          <option value="" disabled hidden>
            Please Choose...
          </option>
        </select>
        {error && error}
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
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="rounded border-2 border-transparent bg-gray-200 p-2 text-gray-900 caret-red-600 hover:border-red-600 focus:border-red-600 focus:outline-0 md:w-72"
      />
      {error && error}
    </div>
  );
});

export default Input;
