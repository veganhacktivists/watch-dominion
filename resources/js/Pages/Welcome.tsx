import ArrowRight from '@/Components/ArrowRight';
import Button from '@/Components/Button';
import { Dialog } from '@/Components/Dialog';
import Stat from '@/Components/Stat';
import type { Lang } from '@/types/lang';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Constants
const twitterIntent =
  'https://twitter.com/intent/tweet?url=https%3A%2F%2Fwatchdominion.org&text=Watch%20the%20award-winning%20and%20life%20changing%20documentary%2C%20Dominion%21&hashtags=watchdominion';
const youtubeUrl = 'https://www.youtube.com/watch?v=LQRAfJyEsko';

type WelcomeProps = {
  defaultLang: Lang;
};

// FIXME Optimize images how they are loaded.
export default function Welcome({ defaultLang = 'en' }: WelcomeProps) {
  const embedRef = useRef<HTMLAnchorElement>(null);
  const [visitors, setVisitors] = useState(10854);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [loading, setLoading] = useState(false);

  const handleLangChange = (value: string) => {
    setLoading(true);
    setLang(value as Lang);
    window.history.pushState(null, '', value === 'en' ? '/' : `/${value}`);

    window.setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleEmbedClick = useCallback(
    event => {
      event.preventDefault();
      setDialogOpen(!dialogOpen);
    },
    [dialogOpen],
  );

  const handleShare = useCallback(async event => {
    if (navigator.share) {
      event.preventDefault();

      const res = await fetch('/img/watchdominion.jpg');
      const blob = await res.blob();
      const file = new File([blob], 'watchdominion.jpg', {
        type: 'image/jpeg',
      });

      await navigator.share({
        text: 'Watch the award-winning and life changing documentary, Dominion!',
        url: 'https://watchdominion.org',
        files: [file],
      });
    }
  }, []);

  async function loadStats() {
    const res = await fetch('https://watch-dominion-stats.vercel.app/visitor');

    if (res.ok) {
      const data = await res.json();
      setVisitors(visitors + data.visitors);
    }
  }

  // Fetch stats on page load.
  useEffect(() => {
    loadStats();
  }, []);

  return (
    <>
      <div className="relative flex flex-col">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center py-12 lg:grid-cols-2">
          <div className="flex flex-col space-y-4 p-16">
            <h1 className="flex flex-col text-center text-7xl font-black uppercase text-beige lg:text-8xl">
              <span className="text-accent">Watch</span>
              <span>this</span>
              <span>movie</span>
            </h1>
            <h2 className="whitespace-nowrap text-center font-rock text-xl uppercase text-accent lg:text-3xl">
              It's life changing !
            </h2>
          </div>
          <div className="hidden lg:block">
            <img
              src="/img/pig-desktop.jpg"
              alt=""
              width="512"
              height="447"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-3">
          <div className="relative aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://embed.watchdominion.org/dominion/embed.html"
              frameBorder="0"
              allow="autoplay; picture-in-picture"
              allowFullScreen
            ></iframe>
            {loading && (
              <p className="absolute inset-0 flex h-full w-full items-center justify-center bg-black text-white">
                Loading...
              </p>
            )}
          </div>
          <div className="flex items-center justify-center bg-accent p-3 text-center text-black">
            <p>
              Video not loading? Watch Dominion{' '}
              <a
                href={youtubeUrl}
                className="font-semibold underline"
                data-click="redirect-youtube"
              >
                on YouTube
              </a>
              !
            </p>
          </div>
          <div className="relative mt-4 flex">
            {/* <Select
              defaultValue={lang}
              label="Language"
              onValueChange={handleLangChange}
            >
              <Option value="en">English</Option>
              <Option value="fr">French</Option>
              <Option value="de">German</Option>
              <Option value="it">Italian</Option>
            </Select> */}

            <div className="ml-auto flex space-x-4">
              <Dialog
                lang={lang}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                trigger={
                  <a
                    href="https://embed.watchdominion.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex appearance-none items-center space-x-2 text-base"
                    title="Learn how to embed Dominion on your own site"
                    onClick={handleEmbedClick}
                    ref={embedRef}
                    data-click="embed"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 33 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="16.5" cy="16.5" r="16.5" fill="#f4c41a" />
                      <path
                        d="M6.40469 15.8359C6.05313 16.2266 6.05313 16.8125 6.40469 17.1641L11.7172 22.4766C12.1078 22.8672 12.6938 22.8672 13.0453 22.4766L13.9438 21.6172C14.2953 21.2266 14.2953 20.6406 13.9438 20.2891L10.1547 16.5L13.9438 12.75C14.2953 12.3984 14.2953 11.7734 13.9438 11.4219L13.0453 10.5234C12.6938 10.1719 12.1078 10.1719 11.7172 10.5234L6.40469 15.8359ZM26.5563 17.1641C26.9078 16.8125 26.9078 16.2266 26.5563 15.8359L21.2438 10.5234C20.8531 10.1719 20.2672 10.1719 19.9156 10.5234L19.0172 11.4219C18.6656 11.8125 18.6656 12.3984 19.0172 12.75L22.8063 16.5391L19.0172 20.2891C18.6656 20.6406 18.6656 21.2266 19.0172 21.6172L19.9156 22.4766C20.2672 22.8672 20.8531 22.8672 21.2438 22.4766L26.5563 17.1641Z"
                        fill="#171716"
                      />
                    </svg>
                    <span className="hidden sm:inline-block">Embed</span>
                  </a>
                }
              />
              <a
                href="https://dominionmovement.com/download"
                target="_blank"
                rel="noopener noreferrer"
                className="flex appearance-none items-center space-x-2 text-base"
                title="Download the movie from the Farm Transparency Project"
                ref={embedRef}
                data-click="download"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16.5" cy="16.5" r="16.5" fill="#f4c41a" />
                  <path
                    d="M24.375 19.125V22.625C24.375 23.0891 24.1906 23.5342 23.8624 23.8624C23.5342 24.1906 23.0891 24.375 22.625 24.375H10.375C9.91087 24.375 9.46575 24.1906 9.13756 23.8624C8.80937 23.5342 8.625 23.0891 8.625 22.625V19.125"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.125 14.75L16.5 19.125L20.875 14.75"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 19.125V8.625"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex flex-col items-center px-8 pt-20 pb-32 text-center lg:max-w-lg">
          <h2 className="text-3xl font-bold">Finished watching?</h2>
          <p className="mt-6 text-xl font-light">
            Take the next step today and make a difference for the animals, the
            environment and yourself. Try a free 30 day vegan challenge and get
            help along the way!
          </p>

          <Button
            as="externalLink"
            className="group mt-12"
            href="https://vbcamp.org/watchdominion"
            data-click="go-to-challenge"
          >
            <span className="mr-6 font-bold">Go to challenge</span>
            <ArrowRight />
          </Button>
        </div>
        <div className="lg:hidden">
          <img src="/img/pig-mobile.jpg" alt="" loading="lazy" />
        </div>

        <div className="-skew-y-6 transform bg-beige px-8 py-20 text-black lg:pt-40 lg:pb-20">
          <div className="mx-auto grid w-full max-w-5xl skew-y-6 transform grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="flex flex-col lg:order-2">
              <div className="mx-auto flex flex-col rounded-xl bg-dark px-8 py-4 text-center font-rubik text-white lg:mt-8">
                <span className="text-2xl font-black uppercase">
                  You are visitor
                </span>
                <Stat className="mt-2" value={visitors} />
              </div>
            </div>

            <div className="flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
              <h2 className="font-rubik text-3xl font-bold text-dark">
                You can help!
              </h2>
              <p className="mt-6 text-xl font-light text-dark">
                We need your help to share this movie as far and as wide as
                possible!
                <br className="lg:hidden" /> <br className="lg:hidden" />
                Use the buttons below to help share on social media, together,
                we can spread kindness!
              </p>
              <Button
                as="externalLink"
                className="group mt-12"
                href={twitterIntent}
                onClick={handleShare}
                data-click="share"
              >
                <span className="mr-6 font-medium">Tap here to share!</span>
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="-skew-y-6 transform px-8 pt-20 text-white">
          <div className="mx-auto grid w-full max-w-5xl skew-y-6 transform grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
              <h2 className="flex flex-col p-8 text-4xl font-bold uppercase text-white">
                <span className="font-rubik">Other</span>
                <span className="font-rock text-accent">movies</span>
              </h2>

              <Button
                as="externalLink"
                variant="secondary"
                className="group mt-6"
                href="https://www.netflix.com/title/81014008"
                data-click="redirect-seaspiracy"
              >
                <span className="mr-6">Seaspiracy</span>
                <ArrowRight />
              </Button>

              <Button
                as="externalLink"
                variant="secondary"
                className="group mt-6"
                href="https://www.netflix.com/id-en/title/81157840"
                data-click="redirect-game-changers"
              >
                <span className="mr-6">Game Changers</span>
                <ArrowRight />
              </Button>

              <Button
                as="externalLink"
                variant="secondary"
                className="group mt-6"
                href="https://www.netflix.com/id-en/title/80174177"
                data-click="redirect-what-the-health"
              >
                <span className="mr-6">What The Health</span>
                <ArrowRight />
              </Button>
            </div>

            <img src="/img/cow-mobile.jpg" alt="" width="512" height="747" />
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center px-8 py-20 text-center lg:order-2">
            <h2 className="flex flex-col p-8 text-4xl font-bold uppercase text-white">
              <span className="font-rubik">Other</span>
              <span className="font-rock text-accent">resources</span>
            </h2>

            <Button
              as="externalLink"
              variant="secondary"
              className="group mt-6"
              href="https://nutritionfacts.org"
              data-click="redirect-nutrition-facts"
            >
              <span className="mr-6">Nutrition Facts</span>
              <ArrowRight />
            </Button>

            <Button
              as="externalLink"
              variant="secondary"
              className="group mt-6"
              href="https://happycow.net"
              data-click="redirect-happycow"
            >
              <span className="mr-6">HappyCow</span>
              <ArrowRight />
            </Button>

            <Button
              as="externalLink"
              variant="secondary"
              className="group mt-6"
              href="https://plantbasednews.org"
              data-click="redirect-plant-based-news"
            >
              <span className="mr-6">Plant Based News</span>
              <ArrowRight />
            </Button>

            <Button
              as="externalLink"
              variant="secondary"
              className="group mt-6"
              href="https://nutritionfacts.org/book/how-not-to-die/"
              data-click="redirect-how-not-to-die"
            >
              <span className="mr-6">How Not To Die</span>
              <ArrowRight />
            </Button>
          </div>
          <img
            className="lg:order-1"
            src="/img/chicks-mobile.jpg"
            width="512"
            height="648"
            alt=""
          />
        </div>

        <div className="bg-accent">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-8 py-10 text-center lg:flex-row lg:space-x-7 lg:text-left">
            <svg
              className="w-20"
              version="1.1"
              viewBox="0 0 569 546"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <circle
                  cx="362.589996"
                  cy="204.589996"
                  data-fill="1"
                  r="204.589996"
                />
                <rect
                  data-fill="1"
                  height="545.799988"
                  width="100"
                  x="0"
                  y="0"
                />
              </g>
            </svg>
            <div className="flex-1 lg:flex lg:flex-col">
              <h2 className="mt-6 font-rubik text-2xl font-bold text-dark lg:hidden">
                Support us on Patreon!
              </h2>
              <h2 className="mt-6 hidden font-rubik text-2xl font-bold text-dark lg:mt-0 lg:block">
                Please consider supporting us on Patreon!
              </h2>
              <p className="mt-4 text-lg text-dark lg:mt-0">
                This free-to-use service wouldn't be possible without your
                support. Thank you!
              </p>
            </div>

            <a
              className="text-bold mt-6 rounded-md bg-black px-4 py-2 text-white lg:hidden"
              href="https://patreon.com/veganhacktivists"
              data-click="redirect-support-us"
            >
              Donate
            </a>
            <a
              className="text-bold hidden rounded-md bg-black px-4 py-2 text-white lg:block"
              href="https://patreon.com/veganhacktivists"
              data-click="redirect-support-us"
            >
              Support us
            </a>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center p-8 text-center lg:flex-row lg:text-left">
          <span className="flex-1">
            A project by the{' '}
            <a
              className="font-bold"
              href="https://veganhacktivists.org"
              data-click="redirect-vegan-hacktivists"
            >
              Vegan Hacktivists
            </a>
          </span>
          <div className="mt-6 flex space-x-6 lg:mt-0">
            <a
              href="https://www.instagram.com/veganhacktivists"
              className="text-white"
              data-click="redirect-instagram"
            >
              <span className="sr-only">Instagram</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="https://github.com/veganhacktivists"
              className="text-white"
              data-click="redirect-github"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
