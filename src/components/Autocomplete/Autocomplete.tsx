import { useState, FC, RefObject } from "react";
import styles from "./Autocomplete.module.css";
import { useAppSelector } from "../../redux/hooks";

interface AutocompleteProps {
  inputRef: RefObject<HTMLInputElement>;
  error: string;
}

export const Autocomplete: FC<AutocompleteProps> = ({ inputRef, error }) => {
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const countries = useAppSelector((state) => state.countries);
  console.log(inputRef);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    setShowDropdown(true);

    if (value) {
      setFilteredCountries(
        countries.filter((country) =>
          country.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredCountries([]);
    }
  };

  const handleSelect = (country: string) => {
    setQuery(country);
    setFilteredCountries([]);
    setShowDropdown(false);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={inputRef}
        placeholder="Select a country"
        className={styles.input}
      />
      {showDropdown && filteredCountries.length > 0 && (
        <ul className={styles.dropdown}>
          {filteredCountries.map((country) => (
            <li
              key={country}
              onClick={() => handleSelect(country)}
              className={styles.element}>
              {country}
            </li>
          ))}
        </ul>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
