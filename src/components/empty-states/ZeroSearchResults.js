export default function ZeroSearchResults({ query }) {
  return (
    <div className="p-8 py-16 md:py-20 lg:py-24 text-center bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50 rounded-xl border-2 border-semi-dark-blue">
      <img className="mb-8 inline-block" src="/zero-search-results.png" />
      <p className="mb-2 text-heading-md text-white/75 ">
        Oops! It seems we couldn't find any results for{" "}
        <span className="text-red">'{query}'</span>.
      </p>

      <p className="text-heading-md text-white/75 ">
        Consider refining your search or try another term!
      </p>
    </div>
  );
}
