import { Car, Track } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Row from "../UI/row";
import Title from "../UI/title";

const CarsTable = () => {
  const cars = trpc.car.getAllCars.useQuery();
  return (
    <>
      <Title>Cars</Title>
      <table className=" w-full text-left">
        <thead className="border-b border-b-red-600">
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Fuel Tank Size</th>
            <th>Tire Change Time</th>
            <th>Tire Change While Refueling</th>
          </tr>
        </thead>

        <tbody>
          {cars.data?.map((car: Car) => {
            return (
              <Row key={car.id}>
                <td>{car.name}</td>
                <td>{car.class}</td>
                <td>{car.fuelTankSize}</td>
                <td>{car.tireChangeTime} seconds</td>
                <td>{car.tireChangeWhileRefueling ? "Yes" : "No"}</td>
              </Row>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CarsTable;
