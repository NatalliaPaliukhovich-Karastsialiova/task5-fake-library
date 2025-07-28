import './style.css';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { getRegions, fetchSeed, loadBooks } from '../services/api';
import React, { useState, useEffect, useRef, useCallback } from "react";
import BookTable from '../components/BookTable';
import BookGallery from '../components/BookGallery';
import ControlsPanel from "../components/ControlsPanel";
import { exportToCSV } from '../utils/exportCSV';
import BookTableHeader from '../components/BookTableHeader';

const PAGE_SIZE = 20;

export default function Home() {
  const [books, setBooks] = useState([]);
  const [seed, setSeed] = useState("152863204");
  const [lang, setLang] = useState("en");
  const [likes, setLikes] = useState(3.0);
  const [reviews, setReviews] = useState(2.0);
  const [page, setPage] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [regions, setRegions] = useState([]);
  const [viewMode, setViewMode] = useState("table");

  const observer = useRef();

  const handleExportCSV = () => {
    toast.warning("Preparing CSV...");
    exportToCSV(books);
  };

  const getBooks = async () => {
    try{
      const { ok, data } = await loadBooks({
        seed,
        lang,
        likes,
        reviews,
        page: 0,
        size: PAGE_SIZE,
      });
      if(ok){
        setBooks(data);
        setPage(1);
        setExpandedIndex(null);
      }
    }catch (err) {
      toast("Error via loading books:", err);
    }
  };

  const getSeed = async() => {
    try {
      const { ok, data } = await fetchSeed();
      if (ok) {
        setSeed(data.seed);
      }
    } catch (err) {
      toast("Error fetching seed:", err);
    }
  }

  const loadMore = useCallback(async () => {
    const { ok, data } = await loadBooks({
      seed,
      lang,
      likes,
      reviews,
      page,
      size: 10,
    });
    setBooks((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);
  }, [page]);

  useEffect(() => {
    getBooks(true);
  }, [seed, lang, likes, reviews]);

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const { ok, data } = await getRegions();
        if (ok) {
          setRegions(data);
        } else {
          toast("Failed to fetch regions");
          setRegions([]);
        }
      } catch (err) {
        toast("Error fetching regions:", err);
        setRegions([]);
      }
    };

    loadRegions();
  }, []);

  const lastBookRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore]
  );

  return (
    <>
     <header className="sticky-top">
      <Navbar/>
      <div className="px-5 pt-3 bg-white">
        <ControlsPanel
          seed={seed}
          setSeed={setSeed}
          lang={lang}
          setLang={setLang}
          likes={likes}
          setLikes={setLikes}
          reviews={reviews}
          setReviews={setReviews}
          regions={regions}
          getSeed={getSeed}
          viewMode={viewMode}
          setViewMode={setViewMode}
          exportCSV={handleExportCSV}
        />
        {viewMode === "table" ? (
          <BookTableHeader/>
        ) : ''}

      </div>
    </header>
    <div className="mx-5">

      {viewMode === "table" ? (
        <BookTable
          books={books}
          expandedIndex={expandedIndex}
          setExpandedIndex={setExpandedIndex}
          lastBookRef={lastBookRef}
        />
      ) : (
        <BookGallery books={books} lastBookRef={lastBookRef} />
      )}
    </div>
    </>
  );
}
