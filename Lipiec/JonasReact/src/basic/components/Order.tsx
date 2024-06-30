type OrderProps = {
  closeHour: number;
};

export const Order = ({ closeHour }: OrderProps) => {
  return (
    <div className="order">
      <p>We're open until {closeHour}. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
};
