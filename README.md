# COVID-19 and Population Dashboard

This project is built using React.js and Vite. It allows users to view COVID-19 data for different countries — including total cases, recoveries, deaths, and population. Users can select a custom date range, and all data is shown using charts and cards.

## Features

- Select country from a dropdown
- Choose a custom date range
- Shows total cases, recoveries, and deaths in cards
- Line chart displays the trend over time
- Pie chart shows the proportion of data
- Works well on both desktop and mobile screens

## Tech Stack Used

- **React.js** – For building the user interface
- **Vite** – For fast development setup
- **Axios** – For fetching data from APIs
- **Recharts** – For showing data in chart form
- **React-icons** – For using icons in the UI
- **CSS3** – For styling the app

## APIs Used

- **COVID Data**: From  https://disease.sh/v3/covid-19/historical/{country}?lastdays=1500

- **Country List & Population**: From GET https://restcountries.com/v3.1/all


## How to Run This Project

```bash
git clone https://github.com/mahiawasthi23/corona-dashboard.git
cd covid-dashboard
npm install
npm run dev
