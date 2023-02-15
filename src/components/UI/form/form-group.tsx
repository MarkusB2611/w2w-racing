import { ReactElement } from "react";

const FormGroup = ({ title, children }: FormGroupProps) => {
  return (
    <>
      <h2 className="mt-4 border-b border-b-red-600">{title}</h2>
      <div className="flex gap-4">{children}</div>
    </>
  );
};

export default FormGroup;

type FormGroupProps = {
  title: string;
  children: ReactElement | ReactElement[];
};
