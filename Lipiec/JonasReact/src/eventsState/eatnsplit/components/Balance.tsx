type BalanceProps = {
  balance: number;
  name: string;
};

export const Balance = ({ balance, name }: BalanceProps) => {
  if (balance < 0) {
    return (
      <p className="red">
        You owe {name} {Math.abs(balance)} euro.
      </p>
    );
  }

  if (balance > 0) {
    return (
      <p className="green">
        {name} owes you {Math.abs(balance)} euro.
      </p>
    );
  }

  return <p>You and {name} are even</p>;
};
