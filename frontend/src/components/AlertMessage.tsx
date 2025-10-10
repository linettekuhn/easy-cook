import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CgSmile, CgSmileSad, CgSmileUpside } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import SlideDiv from "./animations/SlideDiv";
import { AnimatePresence } from "motion/react";

type AlertMessageProps = {
  message: string;
  type: "warning" | "error" | "success";
  onClose: () => void;
};

export default function AlertMessage({
  message,
  onClose,
  type,
}: AlertMessageProps) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = () => {
    setVisible(false);
  };

  const setAutoCloseTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (type !== "error") {
      timeoutRef.current = setTimeout(() => {
        onClose();
      }, 5000);
      return;
    }
  }, [type, onClose]);

  useEffect(() => {
    setVisible(true);
    setAutoCloseTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, setAutoCloseTimer]);

  if (!message) return null;

  let Icon;
  switch (type) {
    case "success":
      Icon = CgSmile;
      break;
    case "warning":
      Icon = CgSmileUpside;
      break;
    default:
      Icon = CgSmileSad;
      break;
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  const handleMouseLeave = () => {
    setAutoCloseTimer();
  };

  return createPortal(
    <AnimatePresence>
      {visible && (
        <SlideDiv
          key={message}
          className={`alertBanner ${type}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onAnimationComplete={(state) => {
            if (state === "exit") onClose();
          }}
        >
          <Icon className="iconButton" />
          <p>{message}</p>
          <button
            className="iconButton"
            title="Click to close banner"
            onClick={handleClose}
          >
            <IoIosClose />
          </button>
        </SlideDiv>
      )}
    </AnimatePresence>,
    document.body
  );
}
