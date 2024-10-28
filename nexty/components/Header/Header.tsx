import Link from "next/link";

export const Header = () => {
  return (
    <header className="p-20 border border-yellow-400">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/about/projects">Projects</Link>
        </li>
      </ul>
    </header>
  );
};
