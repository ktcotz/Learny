import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useEditSetting = () => {
  const query = useQueryClient();

  const { mutate: edit, isPending: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Setting successful edited");
      query.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { edit, isEditing } as const;
};
