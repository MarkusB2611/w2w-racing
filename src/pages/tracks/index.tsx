import Title from "../../components/UI/title";

import AddDriverForm from "../../components/drivers/add-driver-form";
import { trpc } from "../../utils/trpc";
import AddTrackForm from "../../components/tracks/add-track-form";
import { Track } from "@prisma/client";
import TracksTable from "../../components/tracks/tracks-table";
import PageLayout from "../../components/UI/page-layout";

const TracksPage = () => {
  return (
    <PageLayout formElement={<AddTrackForm />} tableElement={<TracksTable />} />
  );
};

export default TracksPage;
