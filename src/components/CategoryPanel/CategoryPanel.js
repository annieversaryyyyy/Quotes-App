import "./CategoryPanel.css";
import dsImg from "../../assets/mainPic.png";
import { NavLink } from "react-router-dom";
import { categories } from "../../categories";

function CategoryPanel() {
  return (
    <>
      <ul className="category-list">
        {categories.map((cat) => (
          <NavLink
            key={cat.id}
            to={cat.id === "all" ? "/" : `/quotes/${cat.id}`}
            className={({ isActive }) =>
              "category-link-wrapper" + (isActive ? " active" : "")
            }
          >
            <li className="category-item">{cat.title}</li>
          </NavLink>
        ))}
      </ul>
      <img className="panel-image" src={dsImg} alt="D.S" />
    </>
  );
}

export default CategoryPanel;
