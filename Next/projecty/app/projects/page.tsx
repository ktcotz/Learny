export default async function Projects() {
  const response = await fetch("http:localhost:3001/repos");
  const data = await response.json();

  return (
    <div className="p-20">
      <h1 className="mb-8 text-xl">Projects</h1>
      <ul>
        {data.map((repo) => (
          <li key={repo.id} className="mb-4">
            <div>{repo.title}</div>
            <div>{repo.description}</div>
            <div>{repo.stargazers_count}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
