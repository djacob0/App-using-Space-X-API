# Develop a web application that fetches data from Space X API

You will be using SpaceX API. <https://docs.spacexdata.com>

Your app should only utilize `https://api.spacexdata.com/v3/launches` endpoint.

---

What the app should do:

- Display a loading component.
- Fetch data from the provided api.
- Apply infinite scrolling.
- Display fetched data in a scrollable view that lazy loads more data when scrolled down.
- Display loading component at the bottom of the list on every lazy load.
- Show message when no more data fetched.
- Integrate basic search feature.

---

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# If Babel Plugin Missing, ESLint Configuration Invalid and Sass Deprecation Warnings shows run these

- npm install sass-loader@latest

- npm install --save-dev @babel/plugin-proposal-private-property-in-object

- then 

- npm start


