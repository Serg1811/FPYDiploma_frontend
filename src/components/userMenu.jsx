import "../styles/header.css"

import ButtonUserMenu from "./buttonUserMenu";
import { headerUserButtons } from "../lib/data";

// КОМПОНЕНТ ШАПКИ ОКНА ХРАНИЛИЩА ФАЙЛОВ
export default function UserMenu() {
  return (
    <div
    >
      <div
        // className="top-panel"
      >
        {Object.entries(headerUserButtons).map(([key, value]) => (
          <ButtonUserMenu
            btnName={key}
            src={value}
          />
        ))}
      </div>
    </div>
  );
}
