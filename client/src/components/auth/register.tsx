import { Link, useNavigate } from "react-router-dom";
import { Field, Button } from "components/Common";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useCreateUserMutation } from "app/api.auth";

const Register = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

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
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await createUser(data).unwrap();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err.data?.errors) {
        err.data.errors.map((el) =>
          setError(el.key, { type: "manual", message: el.msg })
        );
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3">Register</h1>
      <div className="form-fields">
        <Field
          label="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Field
          type="email"
          label="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Field
          type="password"
          label="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button className="btn btn-block" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </div>
      <p>
        Already a member? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};
export default Register;
