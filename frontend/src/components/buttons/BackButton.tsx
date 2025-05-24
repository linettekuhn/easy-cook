import { CgMailReply } from "react-icons/cg";
import styles from "./BackButton.module.css";

type BackButtonProps = {
  onClick: () => void;
  text: string;
};

export default function BackButton({ onClick, text }: BackButtonProps) {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <CgMailReply className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </button>
  );
}
