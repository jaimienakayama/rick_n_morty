import { useState } from "react";
import Head from "next/head";
import Card from "../components/Card.js";
import styles from "../styles/Home.module.css";
import { MdExpandMore } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { RiHomeHeartFill } from "react-icons/ri";

export default function Home({ data }) {
  const { results, info } = data;
  const [characters, setCharacters] = useState(results);
  const [nextPage, setNextPage] = useState(info.next);
  const [query, setQuery] = useState("");

  const handleLoadMore = async () => {
    const res = await fetch(nextPage);
    const data = await res.json();
    setNextPage(data.info.next);
    setCharacters([...characters, ...data.results]);
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQuery(value.toLowerCase());
  };

  const handleSearch = async () => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${query}`
    );
    const data = await res.json();
    setNextPage(data.info?.next);
    setCharacters(data.results);
  };

  const handleHomeClick = async () => {
    setQuery("");
    const res = await fetch(`https://rickandmortyapi.com/api/character`);
    const data = await res.json();
    setNextPage(data.info?.next);
    setCharacters(data.results);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>The Rick and Morty Wiki </title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>The Rick and Morty Wiki</h1>
        <p className={styles.description}>
          <em>“Boom! Big reveal! I turned myself into a pickle!”</em>
        </p>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            onChange={handleOnChange}
            className={styles.searchBar}
            value={query}
          />
          <BiSearchAlt onClick={handleSearch} className={styles.searchBtn}>
            Search
          </BiSearchAlt>
        </div>

        {!characters && (
          <h2 className={styles.error}>Oops.. theres nothing here</h2>
        )}

        <div className={styles.grid}>
          {characters &&
            characters.map((character) => {
              return <Card key={character.id} character={character} />;
            })}
        </div>

        {nextPage ? (
          <MdExpandMore className={styles.moreBtn} onClick={handleLoadMore} />
        ) : (
          <footer className={styles.footer}>
            <RiHomeHeartFill
              className={styles.homeBtn}
              onClick={() => {
                handleHomeClick();
              }}
            />
          </footer>
        )}
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
