import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useAddCabin = () => {
  const query = useQueryClient();
  const { mutate: add, isPending: isAdding } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      query.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { add, isAdding } as const;
};
