import PageLayout from "../../components/UI/page-layout";
import AddCarForm from "../../components/cars/add-car-form";
import CarsTable from "../../components/cars/cars-table";

const CarsPage = () => {
  return (
    <PageLayout formElement={<AddCarForm />} tableElement={<CarsTable />} />
  );
};

export default CarsPage;
