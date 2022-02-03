import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Character.module.css";
import { RiHomeHeartFill } from "react-icons/ri";

const Character = ({ character }) => {
  const {
    id,
    name,
    status,
    species,
    gender,
    origin,
    location,
    image,
    episode,
  } = character;
  const [episodeName, setEpisodeName] = useState("");
  const [episodeId, setEpisodeId] = useState("");
  const locationId = location.url.slice(41);
  const originId = origin.url.slice(41);

  useEffect(() => {
    const firstEpisode = episode[0];
    const getEpisodeName = async () => {
      const res = await fetch(firstEpisode);
      const data = await res.json();
      setEpisodeName(data.name);
      setEpisodeId(data.id);
    };
    getEpisodeName();
  }, [episode]);

  return (
    <div className={styles.container}>
      <div key={id} className={styles.card}>
        <Image src={image} alt={name} width={400} height={400}></Image>
        <div className={styles.info}>
          <Link href={`/characters/${encodeURIComponent(id)}`} passHref>
            <h2 className={styles.header2}>{name}</h2>
          </Link>
          <div className={styles.status}>
            <div className={styles[status.toLowerCase()]}></div>
            {status} - {species} - {gender}
          </div>
          <p>Last known location:</p>
          {location.name === "unknown" ? (
            <h4>{location.name}</h4>
          ) : (
            <Link
              href={`/locations/${encodeURIComponent(locationId)}`}
              passHref
            >
              <h4 className={styles.header4}>{location.name}</h4>
            </Link>
          )}
          <p>First seen in:</p>
          <Link href={`/episodes/${encodeURIComponent(episodeId)}`} passHref>
            <h4 className={styles.header4}>{episodeName}</h4>
          </Link>
          <p>Origin:</p>
          {origin.name === "unknown" ? (
            <h4>{origin.name}</h4>
          ) : (
            <Link href={`/locations/${encodeURIComponent(originId)}`} passHref>
              <h4 className={styles.header4}>{origin.name}</h4>
            </Link>
          )}
        </div>
      </div>
      <footer className={styles.footer}>
        <Link href="/" passHref>
          <RiHomeHeartFill className={styles.homeBtn} />
        </Link>
      </footer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.characterId}`
  );
  const data = await res.json();
  return {
    props: {
      character: data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  const paths = data.results.map((d) => ({
    params: { characterId: d.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Character;
