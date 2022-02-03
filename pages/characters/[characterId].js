import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Character.module.css";
import { RiHomeHeartFill } from "react-icons/ri";
import { useRouter } from "next/router";

const Character = ({ character }) => {
  const [episodeName, setEpisodeName] = useState("");
  const [episodeId, setEpisodeId] = useState("");

  useEffect(() => {
    const firstEpisode = character.episode[0];
    const getEpisodeName = async () => {
      const res = await fetch(firstEpisode);
      const data = await res.json();
      setEpisodeName(data.name);
      setEpisodeId(data.id);
    };
    getEpisodeName();
  });

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const locationId = character.location.url.slice(41);
  const originId = character.origin.url.slice(41);

  return (
    <div className={styles.container}>
      <div key={character.id} className={styles.card}>
        <Image
          src={character.image}
          alt={character.name}
          width={400}
          height={400}
        ></Image>
        <div className={styles.info}>
          <Link
            href={`/characters/${encodeURIComponent(character.id)}`}
            passHref
          >
            <h2 className={styles.header2}>{character.name}</h2>
          </Link>
          <div className={styles.status}>
            <div className={styles[character.status.toLowerCase()]}></div>
            {character.status} - {character.species} - {character.gender}
          </div>
          <p>Last known location:</p>
          {character.location.name === "unknown" ? (
            <h4>{character.location.name}</h4>
          ) : (
            <Link
              href={`/locations/${encodeURIComponent(locationId)}`}
              passHref
            >
              <h4 className={styles.header4}>{character.location.name}</h4>
            </Link>
          )}
          <p>First seen in:</p>
          <Link href={`/episodes/${encodeURIComponent(episodeId)}`} passHref>
            <h4 className={styles.header4}>{episodeName}</h4>
          </Link>
          <p>Origin:</p>
          {character.origin.name === "unknown" ? (
            <h4>{character.origin.name}</h4>
          ) : (
            <Link href={`/locations/${encodeURIComponent(originId)}`} passHref>
              <h4 className={styles.header4}>{character.origin.name}</h4>
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
