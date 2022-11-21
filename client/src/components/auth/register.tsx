import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { RegisterRequest, useCreateUserMutation } from "@/app/auth.api";

import { Input, Button, Form } from "../shared";

const Register = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please provide your name")
      .min(3, "Name can't be less than 3 characters")
      .max(20, "Name can't be more than 20 characters"),
    email: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Password can't be less than 6 characters"),
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterRequest>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await createUser(data).unwrap();
      navigate("/", { replace: true });
    } catch (err: any) {
      if (err.data?.errors) {
        err.data.errors.map((el: { key: keyof RegisterRequest; msg: string }) =>
          setError(el.key, { type: "manual", message: el.msg })
        );
      }
      setTimeout(() => {
        clearErrors();
      }, 5000);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <h1 data-h3>Register</h1>
        <Input
          label="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          type="email"
          label="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          label="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div data-buttons>
          <Button type="submit" isLoading={isLoading || isSuccess}>
            Submit
          </Button>
          <p>
            Already a member?{" "}
            <Link to="/login" data-link>
              Login
            </Link>
          </p>
        </div>
      </section>
    </Form>
  );
};

export default Register;
