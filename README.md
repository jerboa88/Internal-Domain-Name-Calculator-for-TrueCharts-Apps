<!-- Project Header -->
<div align="center">
  <img class="projectLogo" src="src/android-chrome-512x512.png" alt="Project logo" title="Project logo" width="256">

  <h1 class="projectName">
    <a href="https://internal-domain-name-calculator-for-truecharts-apps.johng.io/" title="Internal Domain Name Calculator for TrueCharts Apps">
      Internal Domain Name Calculator for TrueCharts Apps
    </a>
  </h1>

  <p class="projectBadges">
    <img src="https://img.shields.io/badge/type-Web_App-ff5722.svg" alt="Project type" title="Project type">
    <img src="https://img.shields.io/github/languages/top/jerboa88/Internal-Domain-Name-Calculator-for-TrueCharts-Apps.svg" alt="Language" title="Language">
    <img src="https://img.shields.io/github/repo-size/jerboa88/Internal-Domain-Name-Calculator-for-TrueCharts-Apps.svg" alt="Repository size" title="Repository size">
    <a href="LICENSE">
      <img src="https://img.shields.io/github/license/jerboa88/Internal-Domain-Name-Calculator-for-TrueCharts-Apps.svg" alt="Project license" title="Project license"/>
    </a>
    <a href="https://internal-domain-name-calculator-for-truecharts-apps.johng.io/" title="Project URL">
			<img src="https://img.shields.io/website?url=https%3A%2F%2Finternal-domain-name-calculator-for-truecharts-apps.johng.io&up_message=internal-domain-name-calculator-for-truecharts-apps.johng.io%20%E2%86%97" alt="Project URL" title="Project URL">
		</a>
  </p>

  <p class="projectDesc" data-exposition="An online tool to find internal domain names of certain TrueNAS apps. This project was created to solve a personal need and as a way to learn more about the DNS-based service discovery mechanism that Kubernetes uses.">
    An online tool to find the internal domain name of a TrueCharts app
  </p>

  <br/>
</div>


## About
An online tool to find the internal domain name of a [TrueCharts](https://truecharts.org/charts/description_list/) app. Enter the name of the app and service you are working with, and the internal domain will be generated.

Based on information from the [TrueCharts documentation](https://truecharts.org/manual/SCALE/guides/linking-apps/) and the [Kubernetes DNS specification](https://github.com/kubernetes/dns/blob/master/docs/specification.md).

> [!NOTE]
> This is for reference only. If you have access to your TrueNAS system, I would recommend installing and running [HeavyScript](https://github.com/Heavybullets8/heavy_script) to get domain names programmatically instead of using this tool. For example, you can run `heavyscript dns` to get DNS entries for the main services of your apps, or `heavyscript -a` to get DNS entries for all accessible services.


## Installation
1. Install tools:
   - Node.js and NPM. (see [nodejs.org](https://nodejs.org/) for more details)
   - `gulp-cli` with `npm install --global gulp-cli`
2. Download the source code:
   - Clone the repo with `https://github.com/jerboa88/Internal-Domain-Name-Calculator-for-TrueCharts-Apps.git`, or
   - Download the repository as a zip file and extract it
3. Enter the project root with `cd Internal-Domain-Name-Calculator-for-TrueCharts-Apps`.
4. Use `npm install` to install the app and all of its dependencies.
5. Use `npm run build` to build the project and copy assets to the `dist/` directory.
6. Serve the project using `npm start` or use the static HTTP server of your choice. By default, the site can be accessed at [localhost:8000](https://localhost:8000).


## Usage
Fill out the following fields and the domain name will be updated automatically:
- **Catalog App Name**: The name of the app as shown in the TrueCharts catalog. Examples: `traefik`, `plex`, etc.

- **Custom App Name**: The actual name of the app. Usually, this is the same as the catalog app name, but if you renamed the app when you created it, put its new name here. Otherwise, you can leave this blank. For example, if you have multiple instances of the same app running, they will have different names. Examples: `traefik-2`, `plex-for-family`, etc.

- **Service Name**: The service name of the app. Some apps have multiple services running on different endpoints. You can leave this blank if you want to find the domain name for the main service. Otherwise, put the service name here. Examples: `metrics`, `redis`, etc.

- **Port Number**: The port number of the service. If you know the service is running on a specific port, enter it here. Examples: `80`, `443`, `8080`, etc.


## Contributing
Contributions, issues, and forks are welcome.

### Project Structure
- This is a single page web app written in HTML, [SCSS](https://sass-lang.com/), and [TypeScript](https://www.typescriptlang.org/)
- [Gulp](https://gulpjs.com/) is used to build the project
- [Cypress](https://www.cypress.io/) is used for end-to-end testing.

### Commands
- Run `npm run dev` for development. This builds the project, starts the web server, and then watches for changes to files in the src/ directory
- Run `npm run build` to build the project once
- Run `npm test` to run tests with Cypress
- Run `npm start` to start the web server


## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

This project includes various resources which carry their own copyright notices and license terms. See [LICENSE-THIRD-PARTY.md](LICENSE-THIRD-PARTY.md) for more details.
