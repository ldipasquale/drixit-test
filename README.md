## Components
The components directory has four components, where there is no logic from the project, only presentational components. Each component has an `index.js` file which exports the component to be used in a `page`, and a `styles.sass` file where the style is defined and it's being imported from the `index.js`. Each component is a PureComponent (if it has some internal logic) or a memoized functional component. Their props is defined with the `PropTypes` library, in order to keep order in the code and have a signature for each component. If the project uses a library (for example `Chart` or `Spinner` component), it implements an API to be used as the rest of the components, without getting know about which props has to receive the library.

## Constants
It store some variables used around the project that never changes, for example, the way that the numbers will be formated (in a number format, a percentage format)

## Pages
The pages is the entry point that the user has to see the project. In this case, the project has only one page: the `Home` one, that uses the new features of React, hooks, to fetch the `players` from the API and exposes some variables to update its internal state: `isFetching` (to be informed if the `players` was fetched), `selectedPlayers` (that will be used for the `Chart` component) and `setSelectedPlayers` (which will be used for the `Table` component to update the `Chart`).

## Services
This directory has the way to communicate with the API. In this case, as we don't have an API, it has a `mock.json` with the static data, and a `Players` service that simulates an API request.

## Static
Exposes static files, for example, icons.

## Stylesheets
This one has some variables that are used around the app (`colors`, `typography`, `spacings`) and some vendors file that normalize the style of the project.
