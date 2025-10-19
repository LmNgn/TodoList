import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import z from "zod";

const URL_REGISTER =
  "https://api-class-o1lo.onrender.com/api/lamnp/auth/register";
const URL_LOGIN = "https://api-class-o1lo.onrender.com/api/lamnp/auth/login";

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự" }),
  remember: z.boolean().optional(),
});

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Tên người dùng tối thiểu 3 ký tự" })
      .max(30, { message: "Tên người dùng tối đa 30 ký tự" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Xác nhận mật khẩu tối thiểu 6 ký tự" }),
    policy: z.literal(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

const AuthForm = () => {
  const nav = useNavigate();
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(login ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const storage = data.remember ? localStorage : sessionStorage;
      const userData = login
        ? { email: data.email, password: data.password }
        : {
            username: data.username,
            email: data.email,
            password: data.password,
          };

      storage.setItem("authData", JSON.stringify(userData));

      await axios.post(login ? URL_LOGIN : URL_REGISTER, userData);
      toast.success(login ? "Đăng nhập thành công" : "Đăng ký thành công");
      if (login) {
        nav("/todos");
      } else {
        setLogin(true);
      }

      reset();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleToggleForm = () => {
    setLogin((login) => !login);
    reset();
  };

  const isPolicyChecked = watch("policy");

  return (
    <div className="p-10 max-w-md mx-auto handwritten">
      <h2 className="text-xl font-bold mb-6">
        {login ? "Đăng nhập" : "Đăng ký"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {!login && (
          <>
            <input
              type="text"
              placeholder="Tên người dùng"
              {...register("username")}
              className="border p-2"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </>
        )}

        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className="border p-2"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <input
          type="password"
          placeholder="Mật khẩu"
          {...register("password")}
          className="border p-2"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        {!login && (
          <>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              {...register("confirmPassword")}
              className="border p-2"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </>
        )}

        {login && (
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("remember")} />
            <label>Ghi nhớ đăng nhập</label>
          </div>
        )}
        {!login && (
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("policy")} />
            <label>
              Tôi đồng ý với các{" "}
              <a href="#" className="underline">
                điều khoản
              </a>{" "}
              và{" "}
              <a href="#" className="underline">
                dịch vụ
              </a>
            </label>
          </div>
        )}
        {errors.policy && (
          <span className="text-red-500">{errors.policy.message}</span>
        )}

        <button
          type="submit"
          className={`py-2 rounded ${
            login || isPolicyChecked
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!login && !isPolicyChecked}
        >
          {login ? "Đăng nhập" : "Đăng ký"}
        </button>

        <button
          type="button"
          onClick={handleToggleForm}
          className="text-blue-500 underline mt-2 cursor-pointer hover:text-blue-700 transition-all 300"
        >
          {login ? "Quay lại đăng ký" : "Quay lại đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
