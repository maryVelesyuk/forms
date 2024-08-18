import { Link } from "react-router-dom";
import { PageWrapper } from "../../components/PageWrapper";
import { FormData } from "../../components/FormData";
import styles from "./Main.module.css";

export const Main = () => {
  return (
    <PageWrapper>
      <div className={styles.nav}>
        <Link to="/uncontrolled-approach">Uncontrolled Approach</Link>
        <Link to="/react-hook-form">React Hook Form</Link>
      </div>
      <div className={styles.content}>
        <FormData />
      </div>
    </PageWrapper>
  );
};
