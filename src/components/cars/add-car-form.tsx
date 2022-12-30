import Title from "../UI/title";
import Input from "../UI/input";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import { Track } from "../../models/track";
import { Car } from "../../models/car";

const AddCarForm = () => {
  const nameRef = useRef<HTMLInputElement>();
  const classRef = useRef<HTMLInputElement>();
  const fueltankSizeRef = useRef<HTMLInputElement>();
  const tireChangeTimeRef = useRef<HTMLInputElement>();
  const tireChangeWhileRefuelingRef = useRef<HTMLInputElement>();

  const getAllCars = trpc.car.getAllCars.useQuery();
  const addCarMutation = trpc.car.addCar.useMutation({
    onSuccess: (data) => {
      toast.success(`Car ${data.name} added`);
      getAllCars.refetch();
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const car: Car = {
      // @ts-ignore
      name: nameRef.current.value,
      // @ts-ignore
      class: classRef.current.value,
      // @ts-ignore
      fuelTankSize: parseFloat(fueltankSizeRef.current.value),
      // @ts-ignore
      tireChangeTime: parseFloat(tireChangeTimeRef.current.value),
      // @ts-ignore
      tireChangeWhileRefueling: tireChangeWhileRefuelingRef.current.checked,
    };

    // @ts-ignore
    nameRef.current.value = "";
    // @ts-ignore
    classRef.current.value = "";
    // @ts-ignore
    fueltankSizeRef.current.value = "";
    // @ts-ignore
    tireChangeTimeRef.current.value = "";
    // @ts-ignore
    tireChangeWhileRefuelingRef.current.checked = false;

    await addCarMutation.mutateAsync({ car });
  };

  return (
    <>
      <Title>Add Car</Title>
      <form onSubmit={handleSubmit}>
        <Input name="name" ref={nameRef} />
        <Input name="class" ref={classRef} />
        <Input name="fueltank size" type="number" ref={fueltankSizeRef} />
        <Input
          name="tire change time (seconds)"
          type="number"
          ref={tireChangeTimeRef}
        />
        <Input
          name="tire change while refueling"
          type="checkbox"
          ref={tireChangeWhileRefuelingRef}
        />
        <button
          type="submit"
          className="mt-4 rounded-lg bg-red-600 p-4 hover:bg-red-800"
        >
          Add Car
        </button>
      </form>
    </>
  );
};

export default AddCarForm;
