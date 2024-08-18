import { FC } from "react";
import styles from "./FormData.module.css";
import { useAppSelector } from "../../redux/hooks";

export const FormData: FC = () => {
  const { name, age, country, gender, picture } = useAppSelector(
    (state) => state.formData.formData
  );

  if (!name || !age || !country || !gender || !picture) return null;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.titlle}>User Data:</h3>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      <p>Picture: </p>
      <img src={picture} alt="Converted" className={styles.image} />
      <p>Country: {country}</p>
    </div>
  );
};
