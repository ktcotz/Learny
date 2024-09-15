type BlogPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPage({ params }: BlogPageProps) {
  return <div>Blog Page! {params.slug}</div>;
}
