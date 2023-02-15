import { Event } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/router";
import { durationOptions } from "../../helpers/options";
import { trpc } from "../../utils/trpc";
import Row from "../UI/row";
import Title from "../UI/title";

const EventsTable = () => {
  const events = trpc.event.getAllEvents.useQuery();
  const tracks = trpc.track.getAllTracks.useQuery();
  const router = useRouter();

  return (
    <>
      <Title>Events</Title>
      <table className=" w-full text-left">
        <thead className="border-b border-b-red-600">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Track</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {events.data?.map((event: Event) => {
            return (
              <Row
                key={event.id}
                onClick={() =>
                  router.push(`/events/${event.name.replaceAll(" ", "_")}`)
                }
              >
                <td>{event.name}</td>
                <td>
                  {Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(moment.utc(event.date).toDate())}
                </td>
                <td>
                  {
                    tracks.data?.find((track) => track.id === event.trackId)
                      ?.name
                  }
                </td>
                <td>
                  {
                    durationOptions.find(
                      (option) => option.value === event.duration
                    )?.name
                  }
                </td>
              </Row>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default EventsTable;
