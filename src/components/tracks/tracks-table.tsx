import { Track } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import Row from "../UI/row";
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
              <Row key={track.id}>
                <td>{track.name}</td>
                <td>{track.length}km</td>
              </Row>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TracksTable;
