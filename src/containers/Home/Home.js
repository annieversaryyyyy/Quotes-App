import { useEffect, useState } from "react";
import { axiosApi } from "../../axiosApi";
import { categories } from "../../categories";
import "./Home.css";
import Quote from "../../components/Quote/Quote";
import CategoryPanel from "../../components/CategoryPanel/CategoryPanel";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import Pagination from "../../components/Pagination/Pagination";
import Toast from "../../components/Toast/Toast";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const getQuotes = async () => {
      setLoading(true);
      try {
        const { data } = await axiosApi.get("quotes.json");
        if (!data) {
          setQuotes([]);
          return;
        }

        const loadedQuotes = Object.entries(data).map(([id, quote]) => ({
          firebaseId: id,
          ...quote,
        }));

        setQuotes(loadedQuotes.reverse());
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getQuotes().catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [id]);

  const deleteQuote = async (firebaseId) => {
    try {
      await axiosApi.delete(`quotes/${firebaseId}.json`);
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1000);
      setQuotes((prev) => prev.filter((q) => q.firebaseId !== firebaseId));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredQuotes =
    !id || id === "all" ? quotes : quotes.filter((q) => q.categoryId === id);
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = filteredQuotes.slice(firstIndex, lastIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Preloader />;

  if (!quotes.length) {
    return <p>Пока нет созданных цитат, будь первым !</p>;
  }

  return (
    <>
      <div className="layout">
        <div className="panel-left">
          <CategoryPanel categories={categories} />
        </div>

        <div className="panel-right">
          {currentPosts.map((quote) => (
            <Quote
              key={quote.firebaseId}
              quote={quote}
              deleteQuote={() => deleteQuote(quote.firebaseId)}
            />
          ))}
        </div>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        quotes={filteredQuotes.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <Toast message="Цитата успешно удалена" visible={toastVisible} />
    </>
  );
}

export default Home;
