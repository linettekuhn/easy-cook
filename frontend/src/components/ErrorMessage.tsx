import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";

type ErrorMessageProps = {
  message: string;
  onClose: () => void;
};

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  if (!message) return null;
  return createPortal(
    <div className="errorBanner">
      <p>{message}</p>
      <button className="iconButton">
        <IoIosClose onClick={onClose} />
      </button>
    </div>,
    document.body
  );
}
