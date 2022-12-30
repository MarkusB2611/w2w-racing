import Title from "../UI/title";
import Input from "../UI/input";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import { Track } from "../../models/track";

const AddTrackForm = () => {
  const nameRef = useRef<HTMLInputElement>();
  const lengthRef = useRef<HTMLInputElement>();
  const getAllTracks = trpc.track.getAllTracks.useQuery();
  const addTrackMutation = trpc.track.addTrack.useMutation({
    onSuccess: (data) => {
      toast.success(`Track ${data.name} added`);
      getAllTracks.refetch();
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const track: Track = {
      // @ts-ignore
      name: nameRef.current.value,
      // @ts-ignore
      length: parseFloat(lengthRef.current.value),
      pitstopTimes: [],
    };

    // @ts-ignore
    nameRef.current.value = "";
    // @ts-ignore
    lengthRef.current.value = "";

    await addTrackMutation.mutateAsync({ track });
  };

  return (
    <>
      <Title>Add Track</Title>
      <form onSubmit={handleSubmit}>
        <Input name="name" ref={nameRef} />
        <Input name="length" type="number" ref={lengthRef} />
        <button
          type="submit"
          className="mt-4 rounded-lg bg-red-600 p-4 hover:bg-red-800"
        >
          Add Track
        </button>
      </form>
    </>
  );
};

export default AddTrackForm;
