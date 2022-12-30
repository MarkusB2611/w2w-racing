import { Car, Track } from "@prisma/client";
import { trpc } from "../../utils/trpc";
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
              <tr
                key={car.id}
                className="odd: h-12 border-spacing-4 bg-gray-900 even:bg-gray-800"
              >
                <td>{car.name}</td>
                <td>{car.class}</td>
                <td>{car.fuelTankSize}</td>
                <td>{car.tireChangeTime} seconds</td>
                <td>{car.tireChangeWhileRefueling ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CarsTable;
