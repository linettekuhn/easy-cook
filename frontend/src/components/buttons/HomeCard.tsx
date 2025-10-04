import { useNavigate } from "react-router";
import styles from "./HomeCard.module.css";

type Props = {
  title: string;
  link: string;
  filename: string;
  theme: string;
};

export default function HomeCard({ title, link, filename, theme }: Props) {
  const navigate = useNavigate();

  return (
    <div
      data-theme={theme}
      className={styles.cardWrapper}
      onClick={() => navigate(link)}
    >
      <img
        className={styles.image}
        src={`/easy-cook/images/${filename}`}
        alt={title}
      />
      <div className={styles.title}>{title}</div>
    </div>
  );
}
