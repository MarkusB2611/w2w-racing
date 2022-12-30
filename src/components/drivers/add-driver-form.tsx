import Title from "../UI/title";
import Input from "../UI/input";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Driver } from "../../models/driver";
import { trpc } from "../../utils/trpc";

const AddDriverForm = () => {
  const [timezone, setTimezone] = useState({});
  const nameRef = useRef<HTMLInputElement>();
  const accountIdRef = useRef();
  const starterRef = useRef();
  const getAllDrivers = trpc.driver.getAllDrivers.useQuery();
  const addDriverMutation = trpc.driver.addDriver.useMutation({
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Driver ${data.name} added`);
      getAllDrivers.refetch();
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const driver: Driver = {
      // @ts-ignore
      name: nameRef.current.value,
      // @ts-ignore
      accountId: parseInt(accountIdRef.current.value),
      timezone: {
        // @ts-ignore
        name: timezone.abbrev,
        // @ts-ignore
        offset: timezone.offset,
      },
      // @ts-ignore
      isStarter: starterRef.current.checked,
    };
    // @ts-ignore
    nameRef.current.value = "";
    // @ts-ignore
    accountIdRef.current.value = "";
    // @ts-ignore
    starterRef.current.checked = false;

    await addDriverMutation.mutateAsync({ driver });
  };

  return (
    <>
      <Title>Add Driver</Title>
      <form onSubmit={handleSubmit}>
        <Input name="name" ref={nameRef} />
        <Input name="accountId" type="number" ref={accountIdRef} />
        <Input
          name="timezone"
          type="timezone"
          value={timezone}
          onChange={setTimezone}
        />
        <Input name="starter" type="checkbox" ref={starterRef} />
        <button
          type="submit"
          className="mt-4 rounded-lg bg-red-600 p-4 hover:bg-red-800"
        >
          Add Driver
        </button>
      </form>
    </>
  );
};

export default AddDriverForm;
