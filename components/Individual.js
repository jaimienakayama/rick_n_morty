import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Individual.module.css";

const Individual = ({ url }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const individualId = url.slice(42);

  useEffect(() => {
    const fetchIndividual = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setName(data.name);
      setImage(data.image);
    };
    fetchIndividual();
  }, [url]);
  return (
    <div className={styles.individual}>
      {image && (
        <Image
          src={image}
          width={100}
          height={100}
          alt={name}
          className={styles.image}
        />
      )}
      <Link href={`/characters/${encodeURIComponent(individualId)}`} passHref>
        <h4 className={styles.name}>{name}</h4>
      </Link>
    </div>
  );
};

export default Individual;
