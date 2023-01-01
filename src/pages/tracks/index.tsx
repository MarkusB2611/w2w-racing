import PageLayout from "../../components/UI/page-layout";
import AddTrackForm from "../../components/tracks/add-track-form";
import TracksTable from "../../components/tracks/tracks-table";

const TracksPage = () => {
  return (
    <PageLayout formElement={<AddTrackForm />} tableElement={<TracksTable />} />
  );
};

export default TracksPage;
