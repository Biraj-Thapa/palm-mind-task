import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import { login } from "../features/auth/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { data } = await API.post("/auth/login", values);
              dispatch(login({ token: data.token, user: data }));
              toast.success("Logged in");
              navigate("/chat");
            } catch (err) {
              toast.error(err.response?.data?.message || err.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field name="email" className="w-full border p-2 rounded" />
                <div className="text-sm text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full border p-2 rounded"
                />
                <div className="text-sm text-red-500">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full py-2 rounded bg-blue-600 text-white"
              >
                Login
              </button>
              <div className="text-sm text-center">
                <Link to="/register" className="text-blue-600">
                  Create account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
