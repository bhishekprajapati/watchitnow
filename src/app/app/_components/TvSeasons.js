"use client";

import Chip from "@/components/Chip";
import MediaCard from "@/components/MediaCard";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { IconChevronDown } from "@tabler/icons-react";
import classNames from "classnames";
import dynamic from "next/dynamic";

const SeasonEpisodes = dynamic(() => import("./TvSeasonEpisodes"), {
  ssr: false,
});

function SeasonButton({ season, isActive, onClick }) {
  const bttn = classNames({ "bg-dark-blue shadow-dark-blue": isActive });

  return (
    <Button
      className={bttn}
      onClick={onClick}
      variant={isActive ? "shadow" : "light"}
      disabled={isActive}
    >
      {season.name}
    </Button>
  );
}

export default function TvSeasons({ seasons }) {
  const [selectedKey, setSelectedKey] = useState(seasons?.at(0)?.name);
  const [selectedSeason, setSelectedSeason] = useState(seasons?.at(0));

  function handleSelection(key) {
    setSelectedKey(key);
    setSelectedSeason(seasons.find((season) => season.name === key));
  }

  return (
    <div className="p-4 rounded-md bg-gradient-to-tr from-semi-dark-blue/25 to-semi-dark-blue/75 backdrop-blur-lg">
      <div className="md:flex md:gap-x-6">
        <div className="mb-4 md:mb-0 md:flex-[1]">
          <div className="md:hidden">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="shadow"
                  size="sm"
                  className="bg-black shadow-black"
                >
                  {selectedKey}
                  <IconChevronDown size={12} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Selected a season"
                selectionMode="single"
                onAction={handleSelection}
              >
                {seasons?.map((season) => (
                  <DropdownItem key={season.name}>{season.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="hidden md:flex md:flex-col md:gap-y-4">
            {seasons?.map((season) => (
              <SeasonButton
                key={season.name}
                season={season}
                isActive={season.name === selectedKey}
                onClick={() => handleSelection(season.name)}
              />
            ))}
          </div>
        </div>
        <div className="flex-[9]">
          <div className="p-4 md:p-8 mb-4 rounded-md bg-dark-blue">
            <div key={selectedSeason.name} className="mb-4 flex gap-x-8">
              <div className="w-24 md:w-48">
                <MediaCard.Poster path={selectedSeason["poster_path"]} />
              </div>
              <div className="flex-1">
                <h2 className="mb-1 md:mb-2 lg:mb-4 text-xl md:text-2xl lg:text-3xl font-semibold">
                  {selectedSeason.name}
                </h2>
                <div className="mb-4 md:flex md:items-center md:flex-wrap md:gap-x-4">
                  <span className="mb-2 md:mb-0 text-[#66a3ff]">
                    Average votes: {selectedSeason["vote_average"]}
                  </span>
                  <br className="md:hidden" />
                  <Chip className="mb-2 md:mb-0 mr-2 md:mr-0 bg-white text-dark-blue">
                    {selectedSeason["episode_count"]} Episodes
                  </Chip>
                  <Chip className="bg-yellow text-dark-blue">
                    {selectedSeason["air_date"]}
                  </Chip>
                </div>
                <p className="text-lg hidden md:block">
                  {selectedSeason.overview}
                </p>
              </div>
            </div>
            <p className="text-lg md:hidden">{selectedSeason.overview}</p>
          </div>
          <div className="p-4 md:p-8 rounded-md  bg-dark-blue">
            <SeasonEpisodes
              seriesId={useParams().id}
              seasonNumber={selectedSeason["season_number"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
