import AddEventForm from "../../components/events/add-event-form";
import EventsTable from "../../components/events/events-table";
import PageLayout from "../../components/UI/page-layout";

const EventsPage = () => {
  return (
    <PageLayout formElement={<AddEventForm />} tableElement={<EventsTable />} />
  );
};

export default EventsPage;
