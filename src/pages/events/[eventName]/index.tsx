import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

const EventDetailPage = () => {
  const router = useRouter();
  let { eventName } = router.query;
  eventName = eventName?.toString().replace("_", " ");
  const event = trpc.event.getEventByName.useQuery({
    eventName: eventName ? eventName : "",
  });
  console.log(event);
  if (event.data === undefined || event.data === null) {
    return <p>There is no event with this name.</p>;
  }
  return <h2>{event.data?.name}</h2>;
};

export default EventDetailPage;
