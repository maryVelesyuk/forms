import styles from "./PageWrapper.module.css";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
