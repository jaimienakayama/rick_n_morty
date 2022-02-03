import styles from "../../styles/Episode.module.css";
import Individual from "../../components/Individual.js";
import Link from "next/link";
import { RiHomeHeartFill } from "react-icons/ri";
import { useRouter } from "next/router";

const Episode = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div key={data.id} className={styles.card}>
        <h2 className={styles.header2}>{data.name}</h2>
        <p>Air date:</p>
        <h4>{data.air_date}</h4>
        <p>Episode:</p>
        <h4>{data.episode}</h4>
        <p>Characters:</p>
        <div className={styles.characters}>
          {data.characters.length ? (
            data.characters.map((url, i) => {
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

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/episode/${params.episodeId}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export const getStaticPaths = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await res.json();

  const paths = data.results.map((d) => ({
    params: { episodeId: d.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Episode;
