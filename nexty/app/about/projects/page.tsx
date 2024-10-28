export default async function Projects() {
  const response = await fetch("http://localhost:3001/repos");
  const repos = await response.json();

  console.log(repos);
  return (
    <div>
      <h1 className="mb-8 text-xl">Projects</h1>
      <ul>
        {repos.map((repo) => (
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
