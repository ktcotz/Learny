import styles from "./CountryItem.module.css";

export type CountryData = {
  emoji: string;
  country: string;
};

function CountryItem({ emoji, country }: CountryData) {
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
