import styles from "../../styles/Location.module.css";
import Individual from "../../components/Individual.js";
import Link from "next/link";
import { RiHomeHeartFill } from "react-icons/ri";

const Location = ({ location }) => {
  const { id, name, type, dimension, residents } = location;
  return (
    <div className={styles.container}>
      <div key={id} className={styles.card}>
        <h2 className={styles.header2}>{name}</h2>
        <p>Type:</p>
        <h4>{type}</h4>
        <p>Dimension:</p>
        <h4>{dimension}</h4>
        <p>Residents:</p>
        <div className={styles.residents}>
          {residents.length ? (
            residents.map((url, i) => {
              return <Individual key={i} url={url} />;
            })
          ) : (
            <h4>None</h4>
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
    `https://rickandmortyapi.com/api/location/${params.locationId}`
  );
  const data = await res.json();
  return {
    props: {
      location: data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://rickandmortyapi.com/api/location`);
  const data = await res.json();

  const paths = data.results.map((d) => ({
    params: {
      locationId: d.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Location;
