import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LoginRequest, useLoginMutation } from "@/app/auth.api";

import { Button, Form, Input } from "../shared";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginRequest) => {
    console.log(data);

    try {
      await login(data).unwrap();
      navigate("/", { replace: true });
    } catch (err: any) {
      console.log(err);

      setError("email", {
        type: "manual",
        message: ` `,
      });
      setError("password", {
        type: "manual",
        message: err?.data?.msg || "Incorrect email or password",
      });
      setTimeout(() => {
        clearErrors();
      }, 4000);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1 data-h3>Login</h1>
      <section>
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
        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </section>
      <p>
        Not a member yet?{" "}
        <Link to="/register" data-link>
          Register
        </Link>
      </p>
    </Form>
  );

  // return (
  //   <form className="form" noValidate onSubmit={handleSubmit(onSubmit)}>
  //     <h1 className="h3">Login</h1>
  //     <div className="form-fields">
  //       <Input
  //         type="email"
  //         label="email"
  //         error={errors.email?.message}
  //         {...register("email")}
  //       />
  //       <Input
  //         type="password"
  //         label="password"
  //         error={errors.password?.message}
  //         {...register("password")}
  //       />
  //       <Button /* className="btn btn-block" */ /* type="submit" */ /* isLoading={isLoading} */
  //       >
  //         Submit
  //       </Button>
  //     </div>
  //     <p>
  //       Not a member yet? <Link to="/register">Register</Link>
  //     </p>
  //   </form>
  // );
};
export default Login;
