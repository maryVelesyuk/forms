import { FC, RefObject } from "react";
import styles from "./Input.module.css";

interface InputProps {
  id: string;
  type?: string;
  error: string | null;
  inputRef: RefObject<HTMLInputElement>;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input: FC<InputProps> = ({
  id,
  type = "text",
  error,
  inputRef,
  label,
  onChange,
}) => {
  return (
    <div
      className={type === "checkbox" ? styles.checkboxWrapper : styles.wrapper}>
      <label htmlFor={id}>{label}:</label>
      <input
        className={styles.input}
        type={type}
        id={id}
        ref={inputRef}
        onChange={onChange}
      />
      {error && (
        <p
          className={type === "checkbox" ? styles.checkboxError : styles.error}>
          {error}
        </p>
      )}
    </div>
  );
};
