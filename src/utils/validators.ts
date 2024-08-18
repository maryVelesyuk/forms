import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, "First letter should be uppercased")
    .required("Name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .moreThan(0, "Age must be positive and more than 0")
    .required("Age is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/,
      "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
  terms: Yup.boolean()
    .oneOf([true], "You must agree to the Terms and Conditions")
    .required("You must agree to the Terms and Conditions"),
  gender: Yup.string().required("Gender is required"),
  picture: Yup.mixed()
    .required("Please upload a picture")
    .test("is-valid-type", "Not a valid image type", (value) => {
      const fileName = value.name.toLowerCase();
      return isValidFileType(fileName);
    }),
  country: Yup.string().required("Country is required"),
});

export const validFileExtensions = ["jpg", "png", "jpeg"];

export function isValidFileType(fileName: string) {
  const extension = fileName.split(".").pop();
  console.log(fileName);
  return fileName && extension && validFileExtensions.includes(extension);
}
