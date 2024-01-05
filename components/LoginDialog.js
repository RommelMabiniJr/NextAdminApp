import login_validate from "@/validators/validate";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Dialog } from "primereact/dialog";
import { signIn, signOut } from "next-auth/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

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
      <Dialog header="Header" visible={true} maximized={true}>
        {/* Simple login */}
        <Toast ref={toast} />

        {/* Login form */}
        <div className="ml-auto w-5">
          {/* Welcome Message */}
          <h1 className="text-4xl font-bold m-0 mb-2">
            Welcome to KasambahayKo Admin Portal
          </h1>
          <p className="text-lg">Please login to continue to the dashboard</p>
          {/* Login Form */}

          <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid flex flex-column gap-2">
              <div className="p-field">
                <label htmlFor="email">Email</label>
                <input
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
              <div className="p-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="p-inputtext p-component"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <small id="password-help" className="p-error p-d-block">
                    {formik.errors.password}
                  </small>
                ) : null}
              </div>
              <div className="p-field">
                <Button label="Login" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
