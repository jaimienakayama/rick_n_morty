import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Card.module.css";

const Card = ({ character }) => {
  const { name, id, status, species, location, image, episode } = character;
  const [episodeName, setEpisodeName] = useState("");
  const [episodeId, setEpisodeId] = useState("");

  const locationId = location.url.slice(41);

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
    <div key={id} className={styles.card}>
      <Image src={image} alt={name} width={220} height={220}></Image>
      <div className={styles.info}>
        <Link href={`/characters/${encodeURIComponent(id)}`}>
          <h2 className={styles.header2}>{name}</h2>
        </Link>
        <div className={styles.status}>
          <div className={styles[status.toLowerCase()]}></div>
          {status} - {species}
        </div>
        <p>Last known location:</p>
        {location.name === "unknown" ? (
          <h4>{location.name}</h4>
        ) : (
          <Link href={`/locations/${encodeURIComponent(locationId)}`}>
            <h4 className={styles.header4}>{location.name}</h4>
          </Link>
        )}
        <p>First seen in:</p>
        <Link href={`/episodes/${encodeURIComponent(episodeId)}`}>
          <h4 className={styles.header4}>{episodeName}</h4>
        </Link>
      </div>
    </div>
  );
};

export default Card;
