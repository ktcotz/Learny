import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", method: "eq", value: filterValue };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination

  const pageValue = searchParams.get("page");
  const page = pageValue ? Number(pageValue) : 1;

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(data?.count / 10);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { bookings: data?.data, count: data?.count, isLoading } as const;
};
