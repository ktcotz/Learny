import Form from "../../ui/Form";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";
import { AddCabin, AddCabinSchema } from "./schema/AddCabinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCabin } from "./useAddCabin";
import { FormRow, StyledFormRow } from "../../ui/FormRow";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCabin>({
    resolver: zodResolver(AddCabinSchema),
    defaultValues: {
      image: "",
    },
  });

  const { add, isAdding } = useAddCabin();

  const submitHandler = (data: AddCabin) => {
    add(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormRow
        error={errors?.name?.message}
        {...register("name")}
        id="name"
        label="Cabin name"
      />
      <FormRow
        error={errors?.maxCapacity?.message}
        {...register("maxCapacity", { valueAsNumber: true })}
        id="maxCapacity"
        label="Max capacity"
      />
      <FormRow
        error={errors?.regularPrice?.message}
        {...register("regularPrice", { valueAsNumber: true })}
        id="regularPrice"
        label="Regular price"
      />
      <FormRow
        error={errors?.discount?.message}
        {...register("discount", { valueAsNumber: true })}
        id="discount"
        label="Discount"
      />
      <FormRow
        error={errors?.description?.message}
        {...register("description")}
        id="description"
        label="Description"
      />

      <FormRow
        error={errors?.image?.message}
        {...register("image")}
        id="image"
        label="Cabin image"
      />

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isAdding}>Add cabin</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
