<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" />

    <title inertia>Watch the award-winning and life changing documentary, Dominion!</title>
    <meta
      name="description"
      content="Dominion uses drones, hidden and handheld cameras to expose the dark underbelly of modern animal agriculture, questioning the morality and validity of humankind's dominion over the animal kingdom."
    />
    <meta property="og:title" content="Watch Dominion" />
    <meta
      property="og:description"
      content="Watch the award-winning and life changing documentary, Dominion!"
    />
    <meta property="og:url" content="{{ url('/') }}" />

    <meta property="og:type" content="video.movie" />
    <meta property="og:image" content="{{ url('/img/watchdominion.jpg') }}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="384" />
    <meta property="og:image:height" content="384" />
    <meta
      property="og:image:alt"
      content="WatchDominion.org with a pig in the background, looking at the camera"
    />

    <meta property="video:director" content="Chris Delforce" />
    <meta property="video:writer" content="Chris Delforce" />
    <meta property="video:duration" content="7199" />
    <meta property="video:release_date" content="2018" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=Rubik:wght@300;400;500;700;900&display=swap"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript>
      <link
        href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=Rubik:wght@300;400;500;700;900&display=swap"
        rel="stylesheet"
      />
    </noscript>

    <!-- Styles -->
    <link rel="stylesheet" href="https://embed.watchdominion.org/dist/wd-player.css" />
    <link rel="stylesheet" href="{{ mix('css/app.css') }}" />

    <!-- Scripts -->
    <script async src="https://vbcc.veganhacktivists.org/analytics.js"></script>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-0LCL16PGGL"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', 'G-0LCL16PGGL');
    </script>

    @routes
    <script src="{{ mix('js/app.js') }}" defer></script>
    <script src="https://embed.watchdominion.org/dist/wd-player.umd.js"></script>

    @inertiaHead
  </head>
  <body class="bg-dark text-white">
    @inertia @env ('local')
    <script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
    @endenv
  </body>
</html>
