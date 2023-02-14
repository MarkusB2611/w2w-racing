import Title from "../UI/title";
import Input from "../UI/input";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import { Event } from "../../models/event";
import { durationOptions } from "../../helpers/options";

const AddEventForm = () => {
  const nameRef = useRef<HTMLInputElement>();
  const [duration, setDuration] = useState(86400);
  const [track, setTrack] = useState("");
  const [error, setError] = useState({});
  const getAllEvents = trpc.event.getAllEvents.useQuery();
  const getAllTracks = trpc.track.getAllTracks.useQuery();

  const addEventMutation = trpc.event.addEvent.useMutation({
    onSuccess: (data) => {
      toast.success(`Event ${data.name} added`);
      getAllEvents.refetch();
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = {};
    if (track === "") {
      newError.track = "Please select a track";
    }
    if (nameRef.current.value === "") {
      newError.name = "Please give the event a name";
    }
    if (track === "" || nameRef.current.value === "") {
      return setError(newError);
    }
    const event: Event = {
      // @ts-ignore
      name: nameRef.current.value,
      duration: duration,
      trackId: track,
    };

    // @ts-ignore
    nameRef.current.value = "";
    setDuration(86400);
    setTrack("");

    await addEventMutation.mutateAsync({ event: event });
  };

  return (
    <>
      <Title>Add Event</Title>
      <form onSubmit={handleSubmit}>
        <Input name="name" ref={nameRef} error={error.name} />

        <Input
          name="duration"
          type="duration"
          options={durationOptions}
          value={duration}
          onChange={setDuration}
        />
        <Input
          name="track"
          type="select"
          options={getAllTracks.data?.map((track) => ({
            name: track.name,
            value: track.id,
          }))}
          value={track}
          onChange={setTrack}
          error={error.track}
        />
        <button
          type="submit"
          className="mt-4 rounded-lg bg-red-600 p-4 hover:bg-red-800"
        >
          Add Event
        </button>
      </form>
    </>
  );
};

export default AddEventForm;
