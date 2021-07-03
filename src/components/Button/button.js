import styles from './button.module.css';
export default function Button({ children, onClick }) {
  return (
    <button className={styles.button} type="button" id={children} onClick={onClick}>
      {children}
    </button>
  );
}
