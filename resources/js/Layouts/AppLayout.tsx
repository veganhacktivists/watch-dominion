import { Inertia } from '@inertiajs/inertia';
// @ts-ignore
import { InertiaLink, Head } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import JetApplicationMark from '@/Jetstream/ApplicationMark';
import JetBanner from '@/Jetstream/Banner';
import JetDropdown from '@/Jetstream/Dropdown';
import JetDropdownLink from '@/Jetstream/DropdownLink';
import JetNavLink from '@/Jetstream/NavLink';
import JetResponsiveNavLink from '@/Jetstream/ResponsiveNavLink';
import { Team } from '@/types';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    Inertia.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  function logout(e: React.FormEvent) {
    e.preventDefault();
    Inertia.post(route('logout'));
  }

  return (
    <div>
      <Head title={title} />

      <JetBanner />

      <div className="bg-gray-100 min-h-screen">
        <nav className="border-gray-100 border-b bg-white">
          {/* <!-- Primary Navigation Menu --> */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                {/* <!-- Logo --> */}
                <div className="flex flex-shrink-0 items-center">
                  <InertiaLink href={route('dashboard')}>
                    <JetApplicationMark className="block h-9 w-auto" />
                  </InertiaLink>
                </div>

                {/* <!-- Navigation Links --> */}
                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                  <JetNavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                  >
                    Dashboard
                  </JetNavLink>
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="relative ml-3">
                  {/* <!-- Teams Dropdown --> */}
                  {page.props.jetstream.hasTeamFeatures ? (
                    <JetDropdown
                      align="right"
                      width="60"
                      renderTrigger={() => (
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 active:bg-gray-50 inline-flex items-center rounded-md border bg-white px-3 py-2 text-sm font-medium leading-4 transition focus:outline-none"
                          >
                            {page.props.user.current_team?.name}

                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      )}
                    >
                      <div className="w-60">
                        {/* <!-- Team Management --> */}
                        {page.props.jetstream.hasTeamFeatures ? (
                          <>
                            <div className="text-gray-400 block px-4 py-2 text-xs">
                              Manage Team
                            </div>

                            {/* <!-- Team Settings --> */}
                            <JetDropdownLink
                              href={route('teams.show', [
                                page.props.user.current_team!,
                              ])}
                            >
                              Team Settings
                            </JetDropdownLink>

                            {page.props.jetstream.canCreateTeams ? (
                              <JetDropdownLink href={route('teams.create')}>
                                Create New Team
                              </JetDropdownLink>
                            ) : null}

                            <div className="border-gray-100 border-t"></div>

                            {/* <!-- Team Switcher --> */}
                            <div className="text-gray-400 block px-4 py-2 text-xs">
                              Switch Teams
                            </div>

                            {page.props.user.all_teams?.map(team => (
                              <form
                                onSubmit={e => switchToTeam(e, team)}
                                key={team.id}
                              >
                                <JetDropdownLink as="button">
                                  <div className="flex items-center">
                                    {team.id ==
                                      page.props.user.current_team_id && (
                                      <svg
                                        className="text-green-400 mr-2 h-5 w-5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                    )}
                                    <div>{team.name}</div>
                                  </div>
                                </JetDropdownLink>
                              </form>
                            ))}
                          </>
                        ) : null}
                      </div>
                    </JetDropdown>
                  ) : null}
                </div>

                {/* <!-- Settings Dropdown --> */}
                <div className="relative ml-3">
                  <JetDropdown
                    align="right"
                    width="48"
                    renderTrigger={() =>
                      page.props.jetstream.managesProfilePhotos ? (
                        <button className="border-transparent focus:border-gray-300 flex rounded-full border-2 text-sm transition focus:outline-none">
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={page.props.user.profile_photo_url}
                            alt={page.props.user.name}
                          />
                        </button>
                      ) : (
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center rounded-md border bg-white px-3 py-2 text-sm font-medium leading-4 transition focus:outline-none"
                          >
                            {page.props.user.name}

                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      )
                    }
                  >
                    {/* <!-- Account Management --> */}
                    <div className="text-gray-400 block px-4 py-2 text-xs">
                      Manage Account
                    </div>

                    <JetDropdownLink href={route('profile.show')}>
                      Profile
                    </JetDropdownLink>

                    {page.props.jetstream.hasApiFeatures ? (
                      <JetDropdownLink href={route('api-tokens.index')}>
                        API Tokens
                      </JetDropdownLink>
                    ) : null}

                    <div className="border-gray-100 border-t"></div>

                    {/* <!-- Authentication --> */}
                    <form onSubmit={logout}>
                      <JetDropdownLink as="button">Log Out</JetDropdownLink>
                    </form>
                  </JetDropdown>
                </div>
              </div>

              {/* <!-- Hamburger --> */}
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() =>
                    setShowingNavigationDropdown(!showingNavigationDropdown)
                  }
                  className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-500 inline-flex items-center justify-center rounded-md p-2 transition focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={classNames({
                        hidden: showingNavigationDropdown,
                        'inline-flex': !showingNavigationDropdown,
                      })}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={classNames({
                        hidden: !showingNavigationDropdown,
                        'inline-flex': showingNavigationDropdown,
                      })}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Responsive Navigation Menu --> */}
          <div
            className={classNames('sm:hidden', {
              block: showingNavigationDropdown,
              hidden: !showingNavigationDropdown,
            })}
          >
            <div className="space-y-1 pt-2 pb-3">
              <JetResponsiveNavLink
                href={route('dashboard')}
                active={route().current('dashboard')}
              >
                Dashboard
              </JetResponsiveNavLink>
            </div>

            {/* <!-- Responsive Settings Options --> */}
            <div className="border-gray-200 border-t pt-4 pb-1">
              <div className="flex items-center px-4">
                {page.props.jetstream.managesProfilePhotos ? (
                  <div className="mr-3 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={page.props.user.profile_photo_url}
                      alt={page.props.user.name}
                    />
                  </div>
                ) : null}

                <div>
                  <div className="text-gray-800 text-base font-medium">
                    {page.props.user.name}
                  </div>
                  <div className="text-gray-500 text-sm font-medium">
                    {page.props.user.email}
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <JetResponsiveNavLink
                  href={route('profile.show')}
                  active={route().current('profile.show')}
                >
                  Profile
                </JetResponsiveNavLink>

                {page.props.jetstream.hasApiFeatures ? (
                  <JetResponsiveNavLink
                    href={route('api-tokens.index')}
                    active={route().current('api-tokens.index')}
                  >
                    API Tokens
                  </JetResponsiveNavLink>
                ) : null}

                {/* <!-- Authentication --> */}
                <form method="POST" onSubmit={logout}>
                  <JetResponsiveNavLink as="button">
                    Log Out
                  </JetResponsiveNavLink>
                </form>

                {/* <!-- Team Management --> */}
                {page.props.jetstream.hasTeamFeatures ? (
                  <>
                    <div className="border-gray-200 border-t"></div>

                    <div className="text-gray-400 block px-4 py-2 text-xs">
                      Manage Team
                    </div>

                    {/* <!-- Team Settings --> */}
                    <JetResponsiveNavLink
                      href={route('teams.show', [
                        page.props.user.current_team!,
                      ])}
                      active={route().current('teams.show')}
                    >
                      Team Settings
                    </JetResponsiveNavLink>

                    {page.props.jetstream.canCreateTeams ? (
                      <JetResponsiveNavLink
                        href={route('teams.create')}
                        active={route().current('teams.create')}
                      >
                        Create New Team
                      </JetResponsiveNavLink>
                    ) : null}

                    <div className="border-gray-200 border-t"></div>

                    {/* <!-- Team Switcher --> */}
                    <div className="text-gray-400 block px-4 py-2 text-xs">
                      Switch Teams
                    </div>
                    {page.props.user?.all_teams?.map(team => (
                      <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                        <JetResponsiveNavLink as="button">
                          <div className="flex items-center">
                            {team.id == page.props.user.current_team_id && (
                              <svg
                                className="text-green-400 mr-2 h-5 w-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            )}
                            <div>{team.name}</div>
                          </div>
                        </JetResponsiveNavLink>
                      </form>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </nav>

        {/* <!-- Page Heading --> */}
        {renderHeader ? (
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              {renderHeader()}
            </div>
          </header>
        ) : null}

        {/* <!-- Page Content --> */}
        <main>{children}</main>
      </div>
    </div>
  );
}
