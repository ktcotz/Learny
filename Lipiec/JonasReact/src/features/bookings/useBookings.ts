import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", method: "eq", value: filterValue };

  const sortBy = searchParams.get("sortBy");

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", filterValue],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { data, isLoading } as const;
};
