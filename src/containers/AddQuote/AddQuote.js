import { useState } from "react";
import { axiosApi } from "../../axiosApi";
import "./AddQuote.css";
import { categories } from "../../categories";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import Preloader from "../../components/Preloader/Preloader";

function AddQuote() {
  const [quoteData, setQuoteData] = useState({
    text: "",
    author: "Джейсон Стетхем",
    category: "",
  });
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const newQuote = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...quoteData,
      id: crypto.randomUUID(),
    };
    setLoading(true);
    try {
      await axiosApi.post("quotes.json", dataToSend);
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        navigate("/");
      }, 1000);
      setQuoteData({
        text: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const found = categories.find((c) => c.title === value);

      setQuoteData((prev) => ({
        ...prev,
        category: value,
        categoryId: found ? found.id : "",
      }));
      return;
    }
    setQuoteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <Preloader />;

  return (
    <>
      <div>
        <form onSubmit={newQuote} className="formAdd">
          <select
            name="category"
            value={quoteData.category}
            onChange={onChangeInput}
            required
          >
            <option value="">Выберите категорию</option>

            {categories
              .filter((cat) => cat.id !== "all")
              .map((cat) => (
                <option key={cat.id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
          </select>
          <label htmlFor="text">Text:</label>
          <input
            type="text"
            name="text"
            className="textField"
            required
            value={quoteData.text}
            onChange={onChangeInput}
            placeholder="text"
          />
          <button type="submit" className="btnAdd">
            Добавить цитату
          </button>
        </form>
      </div>
      <Toast message="Цитата успешно добавлена!" visible={toastVisible} />
    </>
  );
}

export default AddQuote;
