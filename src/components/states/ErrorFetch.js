import Section from "../Section";
import { IconServerOff } from "@tabler/icons-react";

export default function ErrorFetch({}) {
  return (
    <Section>
      <Section.Content>
        <div className="rounded-xl p-8 md:p-16 lg:p-20 xl:p-24 flex items-center justify-center bg-gradient-to-t from-semi-dark-blue/5 to-semi-dark-blue/50 border-2 border-semi-dark-blue">
          <div className="text-center">
            <IconServerOff
              width={48}
              height={48}
              stroke={1.2}
              className="mb-4 text-red inline-block"
            />
            <p className="text-lg font-light text-red">
              Oops! Something went wrong while loading data.
            </p>

            <p className="text-lg font-light text-red">
              Please try again later!
            </p>
          </div>
        </div>
      </Section.Content>
    </Section>
  );
}
