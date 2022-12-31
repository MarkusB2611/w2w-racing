import { Driver } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Row from "../UI/row";
import Title from "../UI/title";

const DriversTable = () => {
  const drivers = trpc.driver.getAllDrivers.useQuery();
  return (
    <>
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
              <Row key={driver.id}>
                <td>{driver.name}</td>
                <td className="hidden md:table-cell">{driver.accountId}</td>
                <td>{driver.timezone.name}</td>
                <td>{driver.timezone.offset}</td>
                <td>{driver.isStarter ? "yes" : "no"}</td>
              </Row>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DriversTable;
