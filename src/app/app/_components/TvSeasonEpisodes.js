"use client";

import Chip from "@/components/ui/Chip";
import { Media } from "@/components/MediaCard";
import ErrorFetch from "@/components/states/ErrorFetch";
import { getSeasonInfo } from "@/services/moviedb";
import { Modal, ModalBody, ModalContent, Spinner } from "@nextui-org/react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useState } from "react";
import useSWR from "swr";

function EpisodeInfo({ episode }) {
  return (
    <>
      <div className="my-2 flex gap-x-4">
        <div className="flex-[4] md:flex-[2] max-w-24">
          <Media.Still path={episode["still_path"]} />
        </div>
        <div className="flex-[6] md:flex-[8]">
          <h3 className="mb-2 text-xl md:text-2xl line-clamp-3">
            {episode.name}
          </h3>
          <div className="mb-4 flex flex-wrap gap-2">
            <Chip className="bg-black">
              Episode {episode["episode_number"]}
            </Chip>
            <Chip>{episode["runtime"]} mins</Chip>
            <Chip>{episode["air_date"]}</Chip>
          </div>
          <p className="hidden md:block">{episode.overview}</p>
        </div>
      </div>
      <p className="md:hidden">{episode.overview}</p>
    </>
  );
}

function EpisodeButton({ episode, onClick }) {
  return (
    <button
      type="button"
      className="p-4 rounded-sm flex items-center justify-between gap-x-2 bg-gradient-to-tr from-dark-blue to-semi-dark-blue/50 group hover:to-semi-dark-blue shadow-xl hover:text-red hover:shadow-semi-dark-blue/50 transition-all duration-250"
      onClick={onClick}
    >
      <span className="line-clamp-1 text-left">{`${episode["episode_number"]}.  ${episode.name}`}</span>
      <span className="w-6 h-6">
        <IconPlayerPlayFilled
          size={24}
          className="text-dark-blue group-hover:text-red"
        />
      </span>
    </button>
  );
}

export default function TvSeasonEpisodes({ seriesId, seasonNumber }) {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState("");

  const { data, error, isLoading } = useSWR(
    [seriesId, seasonNumber],
    async () => await getSeasonInfo({ seriesId, seasonNumber })
  );

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner color="warning" />
      </div>
    );
  }

  if (data) {
    const { episodes } = data;

    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {episodes?.map((episode) => (
          <EpisodeButton
            key={episode.id}
            episode={episode}
            onClick={() => setSelectedEpisodeId(episode.id)}
          />
        ))}

        <Modal
          size="3xl"
          isOpen={!!selectedEpisodeId}
          onClose={() => setSelectedEpisodeId("")}
          backdrop="blur"
        >
          <ModalContent>
            <ModalBody className="bg-dark-blue max-h-[80vh] overflow-y-auto">
              <EpisodeInfo
                episode={episodes?.find(
                  (episode) => episode.id === selectedEpisodeId
                )}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }

  if (error) {
    return <ErrorFetch />;
  }
}
