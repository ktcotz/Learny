import { Order } from "./Order";

export const Footer = () => {
  const currentHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;

  const isOpen = currentHour >= openHour && currentHour <= closeHour;

  if (isOpen) {
    return (
      <footer className="footer">
        <Order closeHour={closeHour} />
      </footer>
    );
  }

  return (
    <footer className="footer">
      We're happy to welcome you between {openHour}:00 and {closeHour}:00.
    </footer>
  );
};
