import { FormEvent, useRef, useState } from "react";
import styles from "./UncontrolledForm.module.css";
import { Input } from "../../components/Input";
import { PageWrapper } from "../../components/PageWrapper";
import * as Yup from "yup";
import { validationSchema } from "../../utils/validators";
import { Autocomplete } from "../../components/Autocomplete/Autocomplete";
import { useAppDispatch } from "../../redux/hooks";
import { setFormData } from "../../redux/slices/formData";
import { useNavigate } from "react-router-dom";

export const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const genderFemaleRef = useRef<HTMLInputElement | null>(null);
  const genderMaleRef = useRef<HTMLInputElement | null>(null);
  const termsRef = useRef<HTMLInputElement | null>(null);
  const pictureRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    terms: "",
    picture: "",
    country: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.onerror = () => {
        console.log("Error reading file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formValues = {
      name: nameRef.current?.value || "",
      age: Number(ageRef.current?.value) || null,
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
      terms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files![0],
      gender: genderMaleRef.current?.checked
        ? "male"
        : genderFemaleRef.current?.checked
          ? "female"
          : "",
      country: countryRef.current?.value || "",
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({
        name: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        terms: "",
        picture: "",
        country: "",
      });
      dispatch(
        setFormData({
          name: formValues.name,
          age: formValues.age,
          email: formValues.email,
          password: formValues.password,
          gender: formValues.gender,
          terms: formValues.terms,
          picture: base64Image,
          country: formValues.country,
        })
      );
      navigate("/");
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const formattedErrors = validationErrors.inner.reduce((acc, error) => {
          return { ...acc, [error.path!]: error.message };
        }, {});
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit} noValidate>
        <Input id="name" inputRef={nameRef} error={errors.name} label="Name" />
        <Input
          id="age"
          type="number"
          inputRef={ageRef}
          error={errors.age}
          label="Age"
        />
        <Input
          id="email"
          type="email"
          inputRef={emailRef}
          error={errors.email}
          label="Email"
        />
        <Input
          id="password"
          type="password"
          inputRef={passwordRef}
          error={errors.password}
          label="Password"
        />
        <Input
          id="repeadPassword"
          type="password"
          inputRef={confirmPasswordRef}
          error={errors.confirmPassword}
          label="Repead password"
        />
        <div className={styles.radio}>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            ref={genderFemaleRef}
          />
          <label htmlFor="female">female</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            ref={genderMaleRef}
          />
          <label htmlFor="male">male</label>
          {errors.gender && <p className={styles.error}>{errors.gender}</p>}
        </div>
        <Input
          id="terms"
          type="checkbox"
          inputRef={termsRef}
          error={errors.terms}
          label="I agree to the Terms and Conditions"
        />
        <Input
          id="picture"
          type="file"
          inputRef={pictureRef}
          error={errors.picture}
          label="Upload Picture"
          onChange={handleFileChange}
        />
        <Autocomplete inputRef={countryRef} error={errors.country} />
        <button type="submit">Submit</button>
      </form>
    </PageWrapper>
  );
};
