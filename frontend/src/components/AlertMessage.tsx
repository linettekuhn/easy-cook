import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CgSmile, CgSmileSad, CgSmileUpside } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const setAutoCloseTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (type !== "error") {
      timeoutRef.current = setTimeout(() => {
        onClose();
      }, 5000);
      return;
    }
  };

  useEffect(() => {
    const setAutoCloseTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (type !== "error") {
        timeoutRef.current = setTimeout(() => {
          onClose();
        }, 5000);
        return;
      }
    };

    setAutoCloseTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, type, onClose]);

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
    <div
      className={`alertBanner ${type}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className="iconButton" />
      <p>{message}</p>
      <button className="iconButton" title="Click to close banner">
        <IoIosClose onClick={onClose} />
      </button>
    </div>,
    document.body
  );
}
