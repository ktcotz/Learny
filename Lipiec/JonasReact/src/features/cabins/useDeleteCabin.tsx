import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCabin({ id }),

    onSuccess: () => {
      toast.success("Cabin succesfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { deleteMutation, isDeleting } as const;
};
