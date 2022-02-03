import styles from "../../styles/Location.module.css";
import Individual from "../../components/Individual.js";
import Link from "next/link";
import { RiHomeHeartFill } from "react-icons/ri";
import { useRouter } from "next/router";

const Location = ({ location }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div key={location.id} className={styles.card}>
        <h2 className={styles.header2}>{location.name}</h2>
        <p>Type:</p>
        <h4>{location.type}</h4>
        <p>Dimension:</p>
        <h4>{location.dimension}</h4>
        <p>Residents:</p>
        <div className={styles.residents}>
          {location.residents.length ? (
            location.residents.map((url, i) => {
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

  return {
    paths: data.results.map((d) => {
      return {
        params: {
          locationId: d.id.toString(),
        },
      };
    }),
    fallback: true,
  };
};

export default Location;
