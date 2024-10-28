type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  return <div>Blog page! - {slug}</div>;
}
