import Link from "@/components/Link";

export default function MediaLink({ children, className, type, id, ...props }) {
  const href = `/app/${type}/${id}`;
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
