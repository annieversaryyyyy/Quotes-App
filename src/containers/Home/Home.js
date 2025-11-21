import { useEffect, useState } from "react";
import { axiosApi } from "../../axiosApi";
import { categories } from "../../categories";
import "./Home.css";
import Quote from "../../components/Quote/Quote";
import CategoryPanel from "../../components/CategoryPanel/CategoryPanel";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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


  const filteredQuotes =
    !id || id === "all" ? quotes : quotes.filter((q) => q.categoryId === id);

  if (loading) return <Preloader />;

   if (!quotes.length) {
    return <p >Пока нет созданных цитат, будь первым !</p>;
  }

  return (
    <div className="layout">
      <div className="panel-left">
        <CategoryPanel categories={categories} />
      </div>

      <div className="panel-right">
        {filteredQuotes.map((quote) => (
          <Quote key={quote.firebaseId} quote={quote} />
        ))}
      </div>
    </div>
  );
}

export default Home;
