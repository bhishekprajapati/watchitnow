export default {
  MediaDisplay({ title = "Media Section", children, ...props }) {
    return (
      <section className="mb-6 md:mb-8 lg:mb-10" {...props}>
        <header className="text-heading-sm md:text-heading-md lg:text-heading-lg !font-semibold mb-4 md:mb-6 lg:mb-8">
          <h2>{title}</h2>
        </header>
        <div>{children}</div>
      </section>
    );
  },
};
