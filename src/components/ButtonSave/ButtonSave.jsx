import s from "./ButtonSave.module.css";
import { MdSaveAlt } from "react-icons/md";

const ButtonSave = () => {
  return (
    <button className={s.saveRecipeBtn}>
      Save <MdSaveAlt className={s.saveIcon} />
    </button>
  );
};

export default ButtonSave;
