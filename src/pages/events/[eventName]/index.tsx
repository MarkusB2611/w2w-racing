import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../components/UI/input";
import Title from "../../../components/UI/title";
import { durationOptions } from "../../../helpers/options";
import { type Event } from "@prisma/client";
import { trpc } from "../../../utils/trpc";
import { WithContext as ReactTags } from "react-tag-input";
import FormGroup from "../../../components/UI/form/form-group";

const DEFAULT_EVENT = {
  id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "",
  date: moment.utc().toDate(),
  duration: 86400,
  trackId: "",
  greenFlagOffset: 42,
  simStartTime: new Date(),
  sunrise: new Date(),
  sunset: new Date(),
  carClasses: [],
};

const suggestions = [
  { id: "gte", text: "GTE" },
  { id: "gt3", text: "GT3" },
  { id: "gt4", text: "GT4" },
  { id: "lmdh", text: "LMDH" },
  { id: "LMP2", text: "LMP2" },
];

const EventDetailPage = () => {
  const router = useRouter();
  let { eventName } = router.query;
  const isNewEvent = eventName === "newEvent";
  eventName = eventName?.toString().replaceAll("_", " ");
  const event = trpc.event.getEventByName.useQuery({
    eventName: eventName ? eventName : "",
  });
  const getAllTracks = trpc.track.getAllTracks.useQuery();
  const addEventMutation = trpc.event.addEvent.useMutation({
    onSuccess: (data) => {
      toast.success(`Event ${data.name} added`);
      router.push(`/events/${data.name.replace(" ", "_")}`);
    },
  });
  const updateEventMutation = trpc.event.updateEvent.useMutation({
    onSuccess: (data) => {
      toast.success(`Event ${data.name} updated`);
    },
  });
  const [eventData, setEventData] = useState<Event>(DEFAULT_EVENT);
  useEffect(() => {
    if (
      eventName !== "newEvent" &&
      (event.data !== undefined || event.data !== null)
    ) {
      setEventData(event.data || DEFAULT_EVENT);
    }
  }, [event.data, eventName]);

  if (
    eventName !== "newEvent" &&
    (event.data === undefined || event.data === null)
  ) {
    return (
      <div className="mt-8 text-center">
        <p>There is no event with this name.</p>
        <Link href="/events">
          <button className="mt-4 rounded-lg bg-red-600 p-4 hover:bg-red-800">
            Go back to all events
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventData);
    isNewEvent
      ? addEventMutation.mutate({ event: eventData })
      : updateEventMutation.mutate({
          event: eventData,
          id: eventData.id,
        });
    // const t = simStartTimeRef.current.value;
    // const d = moment.utc(t);
    // console.log(eventData);
    // console.log(d);
    // const d = moment(simStartTimeRef.current.value + "Z");
    // console.log(d);

    // const dur = moment.duration({
    //   minutes: 3,
    //   seconds: 52,
    // });
    // console.log(dur);
  };

  const handleNameChange = (newName: string) => {
    setEventData((prev) => ({ ...prev, name: newName }));
  };

  const handleDateChange = (newDate: string) => {
    const date = moment.utc(newDate);
    setEventData((prev) => ({ ...prev, date: date.toDate() }));
  };

  const handleDurationChange = (newDuration: number) => {
    setEventData((prev) => ({ ...prev, duration: newDuration }));
  };

  const handleTrackChange = (newTrack: string) => {
    setEventData((prev) => ({ ...prev, trackId: newTrack }));
  };

  const handleSunriseChange = (newSunrise: string) => {
    const sunrise = moment.utc(newSunrise);
    setEventData((prev) => ({ ...prev, sunrise: sunrise.toDate() }));
  };
  const handleSunsetChange = (newSunset: string) => {
    const sunset = moment.utc(newSunset);
    setEventData((prev) => ({ ...prev, sunset: sunset.toDate() }));
  };

  const handleSimStartTimeChange = (newSimStartTime: string) => {
    const simStartTime = moment.utc(newSimStartTime);
    setEventData((prev) => ({ ...prev, simStartTime: simStartTime.toDate() }));
  };
  const handleGreenFlagOffsetChange = (newGreenFlagOffset: string) => {
    setEventData((prev) => ({
      ...prev,
      greenFlagOffset: parseInt(newGreenFlagOffset),
    }));
  };

  const handleInputBlur = () => {
    console.log(eventData);
  };

  const handleDelete = (i: number) => {
    setEventData((prev) => ({
      ...prev,
      carClasses: prev.carClasses.filter((tag, index) => index !== i),
    }));
  };

  const handleAddition = (tag: { id: string; text: string }) => {
    setEventData((prev) => ({
      ...prev,
      carClasses: [...prev.carClasses, tag],
    }));
  };
  return (
    <div className="p-4 sm:px-24">
      <Title>
        {isNewEvent ? "Add new event" : `Update event ${eventData.name}`}
      </Title>
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <FormGroup title="General">
            <Input
              name="Name"
              value={eventData.name}
              onChange={handleNameChange}
              onBlur={handleInputBlur}
            />
            <Input
              type="date"
              name="date"
              value={moment.utc(eventData.date).format("yyyy-MM-DD")}
              onChange={handleDateChange}
            />
            <Input
              name="duration"
              type="duration"
              options={durationOptions}
              value={eventData.duration}
              onChange={handleDurationChange}
            />
            <Input
              name="track"
              type="select"
              options={getAllTracks.data?.map((track) => ({
                name: track.name,
                value: track.id,
              }))}
              value={eventData.trackId}
              onChange={handleTrackChange}
            />
            <ReactTags
              classNames={{
                tag: "bg-red-600 pr-4",
                tagInputField:
                  "rounded border-2 border-transparent bg-gray-200 p-2 text-gray-900 caret-red-600 hover:border-red-600 focus:border-red-600 focus:outline-0 md:w-72",
              }}
              inputFieldPosition="top"
              allowDragDrop={false}
              tags={eventData.carClasses}
              suggestions={suggestions}
              delimiters={[13]}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              autocomplete
            />
          </FormGroup>
          <FormGroup title="Times">
            <Input
              type="datetime-local"
              name="simStartTime"
              value={moment
                .utc(eventData.simStartTime)
                .format("yyyy-MM-DD[T]HH:mm")}
              onChange={handleSimStartTimeChange}
            />
            <Input
              type="datetime-local"
              name="sunrise"
              value={moment.utc(eventData.sunrise).format("yyyy-MM-DD[T]HH:mm")}
              onChange={handleSunriseChange}
            />
            <Input
              type="datetime-local"
              name="sunset"
              value={moment.utc(eventData.sunset).format("yyyy-MM-DD[T]HH:mm")}
              onChange={handleSunsetChange}
            />
            <Input
              name="Green Flag Offset (in minutes)"
              value={eventData.greenFlagOffset}
              onChange={handleGreenFlagOffsetChange}
              onBlur={handleInputBlur}
            />
          </FormGroup>
          <div className="flex gap-4"></div>
          <div className="flex gap-4"></div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="mt-4 rounded-lg bg-red-600 p-4 hover:bg-red-800"
            >
              Save Event
            </button>
            {!isNewEvent && (
              <button
                className="mt-4 rounded-lg bg-[#5662F6] p-4 hover:bg-[#3E47B3]"
                type="button"
              >
                Post on Discord
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetailPage;
