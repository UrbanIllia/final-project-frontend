import Modal from "react-modal";
import CloseIcon from "../Icons/CloseIcon";
import css from "./AuthModal.module.css";

Modal.setAppElement("#root");

export default function AuthModal({
  isOpen,
  onClose,
  title = "Error",
  message = "Something went wrong.",
  primaryBtnText = "OK",
  secondaryBtnText,
  onPrimaryClick,
  onSecondaryClick,
}) {
  const handlePrimary = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      onClose();
    }
  };

  const handleSecondary = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button className={css.closeBtn} onClick={onClose} aria-label="Close">
        <CloseIcon className={css.closeIcon} />
      </button>

      <h3 className={css.title}>{title}</h3>

      <p className={css.text}>{message}</p>

      <div className={css.buttons}>
        {secondaryBtnText && (
          <button className={css.buttonLogin} onClick={handleSecondary}>
            {secondaryBtnText}
          </button>
        )}
        {primaryBtnText && (
          <button className={css.buttonRegister} onClick={handlePrimary}>
            {primaryBtnText}
          </button>
        )}
      </div>
    </Modal>
  );
}
