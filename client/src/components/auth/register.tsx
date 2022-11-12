import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form } from "../shared";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import { useCreateUserMutation } from "app/api.auth";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  // const [createUser, { isLoading }] = useCreateUserMutation();

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
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1 data-h3>Register</h1>
      <section>
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
        <Button
          type="submit"
          // data-loading={isLoading || undefined}
        >
          {/* {createUser.isLoading ? "Loading..." : "Submit"} */}
          Submit
        </Button>
      </section>
      <p>
        Already a member?{" "}
        <Link to="/login" data-link>
          Login
        </Link>
      </p>
    </Form>
  );
};
export default Register;
