import { Track } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Title from "../UI/title";

const TracksTable = () => {
  const tracks = trpc.track.getAllTracks.useQuery();
  return (
    <>
      <Title>Tracks</Title>
      <table className=" w-full text-left">
        <thead className="border-b border-b-red-600">
          <tr>
            <th>Name</th>
            <th>Length</th>
          </tr>
        </thead>

        <tbody>
          {tracks.data?.map((track: Track) => {
            return (
              <tr
                key={track.id}
                className="odd: h-12 border-spacing-4 bg-gray-900 even:bg-gray-800"
              >
                <td>{track.name}</td>
                <td>{track.length}km</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TracksTable;
