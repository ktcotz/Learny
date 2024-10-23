import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckin = (bookingID?: string) => {
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending: isChecking } = useMutation({
    mutationFn: () =>
      updateBooking(bookingID, { status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking ${data?.id} succesfully checked!`);
      queryClient.invalidateQueries({ queryKey: ["booking", bookingID] });
    },
  });

  return { checkin, isChecking } as const;
};
