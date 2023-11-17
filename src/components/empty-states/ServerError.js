"use client";

export default function ServerError() {
  return (
    <>
      <div className="rounded-xl p-8 md:p-16 lg:p-20 xl:p-24 flex items-center justify-center bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50 border-2 border-semi-dark-blue">
        <div className="text-center">
          <img className="mb-8 inline-block" src="/500.png" />
          <p className="mb-2 text-heading-sm font-light text-white/50">
            Oops! Something went wrong.Please try again shortly.
          </p>
          <p className="text-heading-sm font-light text-white/50">
            Thank you for your understanding.
          </p>
        </div>
      </div>
    </>
  );
}
