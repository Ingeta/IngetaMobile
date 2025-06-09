# IngetaMobile

IngetaMobile is a modern cross-platform mobile application developed by **Ingeta** and **Harlem Mufoncol** using [Ionic Framework](https://ionicframework.com/), [Capacitor](https://capacitorjs.com/), and [Angular](https://angular.io/). The app offers content delivery, media playback, podcasts, and RSS integration, all with a native feel for both Android and iOS.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Running on Devices](#running-on-devices)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- ⚡ **Hybrid Mobile App**: Runs on Android, iOS, and web browsers.
- 📰 **WordPress Integration**: Fetches posts, categories, comments, and media via the WordPress REST API.
- 🎧 **Podcast & Media Playback**: Modern audio player with playlist support.
- 🎬 **Video Playback**: Integrated with Plyr for rich video experiences.
- 📰 **RSS Feed Parsing**: Aggregates and displays news from RSS sources.
- 🔍 **Search & Save**: Search articles and save favorites for offline reading.
- 🎨 **Dynamic Theming**: Categories are color-coded for better UX.
- 🚀 **Native Device Support**: Splash screen, status bar, and network info via Capacitor plugins.
- 🗂️ **Modern UI**: Built with Ionic 8+ components and Swiper for slick navigation.

---

## Screenshots

> _Add screenshots of your app here for visual reference!_

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [Capacitor CLI](https://capacitorjs.com/docs/getting-started) (`npm install -g @capacitor/cli`)
- [Android Studio](https://developer.android.com/studio) (for Android builds)
- [Xcode](https://developer.apple.com/xcode/) (for iOS builds, macOS only)

### Clone & Install

```bash
git clone https://github.com/Ingeta/IngetaMobile.git
cd IngetaMobile
npm install
```

---

## Development

### Run in Browser

```bash
ionic serve
```

### Useful Commands

- `npm start` – Start the local dev server
- `npm run build` – Build the Angular app for production
- `npm run test` – Run unit tests
- `npm run lint` – Lint the codebase
- `npm run e2e` – Run end-to-end tests

---

## Building for Production

```bash
ionic build --prod
npx cap sync
```

---

## Running on Devices

### Android

```bash
npx cap open android
# Then build and run from Android Studio
```

### iOS

```bash
npx cap open ios
# Then build and run from Xcode (macOS only)
```

---

## Project Structure

```
src/
  app/
    services/        # Angular services (API, playback, menus, etc.)
    pages/           # App pages (Home, Categories, Posts, etc.)
    components/      # Shared UI components
  assets/            # Static files and images
  environments/      # Environment variables (API URLs, etc.)
capacitor.config.ts  # Capacitor configuration
package.json         # Project metadata and dependencies
```

---

## Configuration

- **API Endpoints:** Set your WordPress or backend URL in `src/environments/environment.ts`.
- **Capacitor Plugins:** Adjust `capacitor.config.ts` as needed for your app ID, name, and plugin settings.
- **Theming:** Edit colors in services or styles as needed.

---

## Testing

### Unit Tests

```bash
npm test
```

### End-to-End Tests

```bash
npm run e2e
```

- _Note: The project uses Jasmine/Karma for unit tests and Protractor for e2e by default. For new projects, consider [Cypress](https://www.cypress.io/) and [Jest](https://jestjs.io/) for a modern workflow._

---

## Contributing

Contributions are welcome!  
1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes.
4. Open a Pull Request.

> Please follow Angular and Ionic best practices, and write clear commit messages.

---

## License

MIT License, co-owned by Ingeta and Harlem Mufoncol.  
See [LICENSE](LICENSE) for details.

---

## Author

Ingeta and Harlem Mufoncol
