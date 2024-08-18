import { FC } from "react";

interface SelectProps {
  id: string;
  label: string;
  values: [{ value: string }];
}

export const Select: FC<SelectProps> = ({ id, label, values }) => {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <select id={id}>
        <option value="">--Please choose an option--</option>
        {values.map((value, index) => (
          <option key={index} value={value.value}>
            {value.value}
          </option>
        ))}
      </select>
    </div>
  );
};
