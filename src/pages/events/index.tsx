import Link from "next/link";
import AddEventForm from "../../components/events/add-event-form";
import EventsTable from "../../components/events/events-table";
import PageLayout from "../../components/UI/page-layout";

const EventsPage = () => {
  return (
    <div className=" flex flex-col justify-between gap-8 p-4 sm:px-24">
      <Link
        className="mt-4 w-48 rounded-lg bg-red-600 p-4 text-center hover:bg-red-800"
        href="/events/newEvent"
      >
        Add Event
      </Link>
      <div className=" w-full md:order-1">{<EventsTable />}</div>
    </div>
  );
};

export default EventsPage;
