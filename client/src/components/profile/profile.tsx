import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { selectUser } from "@/features/user.slice";
import { UpdateRequest, useUpdateUserMutation } from "@/app/auth.api";

import { Input, Button, Form, FormContainer } from "@/components/shared";
import { useAlert, useAppSelector } from "@/hooks";
import { ButtonInline } from "../shared/button";

const Profile = () => {
  const { alert, setAlert } = useAlert();
  const user = useAppSelector(selectUser);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please provide your name")
      .min(3, "Name can't be less than 3 characters")
      .max(20, "Name can't be greater than 20 characters"),
    lastName: yup
      .string()
      .max(20, "Last name can't be greater than 20 characters"),
    email: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
    location: yup.string().max(20, "Can't be greater than 20 characters"),
  });

  const defaultValues = {
    name: user?.name,
    lastName: user?.lastName,
    email: user?.email,
    location: user?.location,
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateRequest>({ resolver: yupResolver(schema), defaultValues });

  const isDisabled = !isDirty || !isValid;

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    reset();
  };

  const onSubmit = async (data: UpdateRequest) => {
    if (isDisabled) return;
    try {
      const result = await updateUser(data).unwrap();
      setAlert({ isSuccess: true, message: "Profile updated!" });
      reset(result);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    } catch (err: any) {
      if (err.data?.errors) {
        err.data.errors.map((el: { key: keyof UpdateRequest; msg: string }) =>
          setError(el.key, { type: "manual", message: el.msg })
        );
      }
      setAlert({ isSuccess: false, message: "Failure" });
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 data-h3>Profile</h2>
        <section>
          <Input
            label="name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="last name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
          <Input
            type="email"
            label="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="location"
            error={errors.location?.message}
            {...register("location")}
          />
          <div data-buttons>
            <Button
              type="submit"
              alert={alert}
              isLoading={isLoading}
              data-disabled={isDisabled || undefined}
            >
              Save changes
            </Button>
            <ButtonInline type="reset" onClick={handleReset}>
              Reset changes
            </ButtonInline>
          </div>
        </section>
      </Form>
    </FormContainer>
  );
};
export default Profile;
