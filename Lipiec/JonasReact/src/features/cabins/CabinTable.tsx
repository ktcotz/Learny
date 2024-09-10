import { useGetCabins } from "./useGetCabins";
import Spinner from "../../ui/Spinner";
import { CabinRow } from "./CabinRow";
import { Table } from "../../ui/Table";

export const CabinTable = () => {
  const { cabins, isLoading } = useGetCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {cabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
};
