import styles from "./style/Overlay.module.css";

const Overlay = ({episode, image, saison}) => {
  return (
    <article className={styles.article}>
      <picture className={styles.picture}>
        <source media="(min-width: 0px)" srcSet={image} />
        {saison === "Film" ?<img style={{display: "flex", height: "100%", width: "100%", borderRadius:"15px", opacity: 0.9}} src={image} alt={image} /> : <img style={{display: "flex", height: "100%", width: "100%", borderRadius:"15px"}} src={image} alt={image} />}
      </picture>
    </article>
  );
};

export default Overlay;