import AddDriverForm from "../../components/drivers/add-driver-form";
import PageLayout from "../../components/UI/page-layout";
import DriversTable from "../../components/drivers/drivers-table";

const DriversPage = () => {
  return (
    <PageLayout
      formElement={<AddDriverForm />}
      tableElement={<DriversTable />}
    />
  );
};

export default DriversPage;
