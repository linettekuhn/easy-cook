import styles from "./ProfileIcon.module.css";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { interpolate } from "flubber";
import { useEffect } from "react";

export default function ProfileButton({ isOpen }: { isOpen: boolean }) {
  const personPath =
    "M14.5 7C17.5376 7 20 9.46243 20 12.5C20 14.6268 18.7919 16.4697 17.0254 17.3848C18.3286 17.7903 19.5279 18.5064 20.5107 19.4893C22.1048 21.0833 23 23.2457 23 25.5C23 25.5 20.5104 29 14.5 29C8.49107 29 6.00122 25.5017 6 25.5C6 23.2457 6.8952 21.0833 8.48926 19.4893C9.47187 18.5066 10.6708 17.7904 11.9736 17.3848C10.2076 16.4695 9 14.6265 9 12.5C9 9.46243 11.4624 7 14.5 7Z";
  const closePath =
    "M20.4091 7.46985C20.702 7.17717 21.1768 7.17703 21.4696 7.46985C21.7622 7.76268 21.7622 8.23755 21.4696 8.53039L15.5604 14.4396L22.5302 21.4093C22.8229 21.7022 22.823 22.177 22.5302 22.4698C22.2373 22.7626 21.7625 22.7625 21.4696 22.4698L14.4999 15.5001L7.53016 22.4698C7.23732 22.7626 6.76249 22.7625 6.46961 22.4698C6.17676 22.177 6.17683 21.7022 6.46961 21.4093L13.4393 14.4396L7.53016 8.53039C7.23744 8.23752 7.23743 7.7627 7.53016 7.46985C7.82301 7.177 8.2978 7.17709 8.59071 7.46985L14.4999 13.379L20.4091 7.46985Z";

  // update progress value when isOpen changes
  const progress = useMotionValue(isOpen ? 1 : 0);
  useEffect(() => {
    animate(progress, isOpen ? 1 : 0, { duration: 0.2 });
  }, [isOpen, progress]);

  // transforms 1 and 0 to person or close path strings (calls interpolator to return the value to use at t frame)
  const d = useTransform(progress, [0, 1], [personPath, closePath], {
    mixer: (from: string, to: string) => {
      // function that returns the SVG path at progress t
      return interpolate(from, to, { maxSegmentLength: 1 });
    },
  });
  return (
    <svg
      width="27"
      height="28"
      viewBox="0 0 29 30"
      className={`${styles.profile} ${isOpen ? styles.open : styles.closed}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <ellipse
          className={styles.circle}
          cx="14.5"
          cy="15"
          rx="13.5"
          ry="14"
          fill="none"
          strokeWidth="1.5"
        />

        <motion.path className={styles.person} d={d} />
      </g>
    </svg>
  );
}
