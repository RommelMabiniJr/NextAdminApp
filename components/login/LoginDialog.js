import login_validate from "@/validators/validate";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Dialog } from "primereact/dialog";
import { signIn, signOut } from "next-auth/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import styles from "./loginStyles.module.css";
import { InputText } from "primereact/inputtext";

const LoginDialog = () => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const toast = useRef(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    // e.preventDefault();

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      remember: checked,
      redirect: false,
      // callbackUrl: "/",
    });

    if (result.ok) {
      // refresh the page when signed in and must show the dashboard
    } else {
      toast.current.show({
        severity: "error",
        summary: "Login Failed",
        detail: "Invalid email or password",
        life: 3000,
      });
    }
  }

  return (
    <div>
      <Dialog
        headerClassName="hidden"
        header="Header"
        visible={true}
        maximized={true}
        contentClassName="p-0"
      >
        {/* Simple login */}
        <Toast ref={toast} />

        {/* Login form */}

        <div className="flex h-full w-full p-4">
          <div
            className="bg-no-repeat bg-cover border-round-md flex-1 relative flex justify-content-end align-items-end"
            style={{
              backgroundImage: `url(/layout/images/login-img.jpg)`,
            }}
          >
            <div
              className={`h-full w-full opacity-50 border-round-md absolute top-0 left-0`}
              style={{
                background:
                  "linear-gradient(90deg, hsla(330, 81%, 60%, 1) 0%, hsla(217, 91%, 60%, 1) 100%)",
              }}
            ></div>
            <p className="text-white text-lg m-0 font-bold p-5 pb-3 pr-4 text-right">
              FINDING THE PERFECT CARETAKER WITH A TAP
              {/* cAPITALIZE VERISON BELOW */}
            </p>
          </div>

          <div className="ml-auto flex flex-column justify-content-center w-5 p-4 relative">
            {/* Welcome Message */}
            <div className="logo absolute top-0 left-0 flex align-items-center justify-content-end mb-6">
              <img
                src={`/layout/images/logo-dark.png`}
                width="55px"
                height={"30px"}
                widt={"true"}
                alt="logo"
              />
              <span className="font-bold text-2xl">KasambahayKo</span>
            </div>
            <h1 className="text-5xl font-bold m-0 mb-2">Hi, Welcome Back!</h1>
            <p className="text-lg">
              Sign in to your account to proceed to the admin panel.
            </p>
            {/* Login Form */}

            <form onSubmit={formik.handleSubmit}>
              <div className="p-fluid flex flex-column gap-3">
                <div className="p-field flex flex-column gap-2">
                  <label htmlFor="email">Email</label>
                  <InputText
                    id="email"
                    name="email"
                    type="email"
                    className="p-inputtext p-component"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <small id="email-help" className="p-error p-d-block">
                      {formik.errors.email}
                    </small>
                  ) : null}
                </div>
                <div className="p-field flex flex-column gap-2">
                  <label htmlFor="password">Password</label>
                  <InputText
                    id="password"
                    name="password"
                    type="password"
                    className="p-inputtext p-component"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    toggleMask
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <small id="password-help" className="p-error p-d-block">
                      {formik.errors.password}
                    </small>
                  ) : null}
                </div>
                <div className="p-field mt-3">
                  <Button label="Login" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
