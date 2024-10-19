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

  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", filterValue, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { data, isLoading } as const;
};
