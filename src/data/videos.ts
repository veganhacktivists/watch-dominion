import { Lang } from "@/types/lang.ts";
import { Video } from "@/types/video.ts";

export const videos = {
  en: {
    embedUrl:
      "https://iframe.mediadelivery.net/embed/135301/89232d42-e290-40fc-917d-5669478ee73b?autoplay=true&loop=false&muted=false&preload=false",
    youtubeUrl: "https://www.youtube.com/watch?v=LQRAfJyEsko",
  },
  it: {
    embedUrl:
      "https://iframe.mediadelivery.net/embed/135301/807b47bc-1e41-4984-ad0a-bb8d5888651d?autoplay=true&loop=false&muted=false&preload=false",
    youtubeUrl: "https://www.youtube.com/watch?v=sGov7OJDDO0",
  },
  fr: {
    embedUrl:
      "https://iframe.mediadelivery.net/embed/135301/0987ec27-855b-4f03-850f-a7863b7591f8?autoplay=true&loop=false&muted=false&preload=false",
    youtubeUrl: "https://www.youtube.com/watch?v=4yLbg1DvgBU",
  },
  de: {
    embedUrl:
      "https://iframe.mediadelivery.net/embed/135301/eba1dc19-db0f-4378-9eaf-f6d31777d095?autoplay=true&loop=false&muted=false&preload=false",
    youtubeUrl: "https://www.youtube.com/watch?v=V7DrljVAaYk",
  },
} as const satisfies Record<Lang, Video>;
