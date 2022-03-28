<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" />

    <title inertia>{{ config('app.name', 'Watch Dominion') }}</title>

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
    <link rel="stylesheet" href="{{ mix('css/app.css') }}" />

    <!-- Scripts -->
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

    @inertiaHead
  </head>
  <body class="bg-dark text-white">
    @inertia @env ('local')
    <script src="http://localhost:3000/browser-sync/browser-sync-client.js"></script>
    @endenv
  </body>
</html>
