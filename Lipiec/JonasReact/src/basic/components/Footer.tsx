export const Footer = () => {
  const currentHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;

  const isOpen = currentHour >= openHour && currentHour <= closeHour;
  
  return <footer className="footer">We're open currently!</footer>;
};
