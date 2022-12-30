import Title from "../../components/UI/title";

import AddDriverForm from "../../components/drivers/add-driver-form";
import { trpc } from "../../utils/trpc";
import { Driver } from "@prisma/client";

const DriversPage = () => {
  const drivers = trpc.driver.getAllDrivers.useQuery();
  console.log(drivers);
  return (
    <div className=" flex flex-col justify-between gap-8 p-4 sm:px-24 md:flex-row">
      <div className="md:order-2">
        <AddDriverForm />
      </div>
      <div className=" md:order-1 md:w-3/4 md:border-r-2 md:border-red-600 md:pr-8">
        <Title>Drivers</Title>
        <table className=" w-full text-left">
          <thead className="border-b border-b-red-600">
            <tr>
              <th>Name</th>
              <th className="hidden md:table-cell">Account Id</th>
              <th colSpan={2}>Timezone</th>
              <th>Starter</th>
            </tr>
            <tr>
              <th></th>
              <th className="hidden md:table-cell"></th>
              <th>Name</th>
              <th>Offset</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {drivers.data?.map((driver: Driver) => {
              return (
                <tr
                  key={driver.id}
                  className="odd: h-12 border-spacing-4 bg-gray-900 even:bg-gray-800"
                >
                  <td>{driver.name}</td>
                  <td className="hidden md:table-cell">{driver.accountId}</td>
                  <td>{driver.timezone.name}</td>
                  <td>{driver.timezone.offset}</td>
                  <td>{driver.isStarter ? "yes" : "no"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriversPage;
