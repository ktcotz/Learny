import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export const useBooking = (id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    enabled: !!id,
  });

  return { data, isLoading } as const;
};
