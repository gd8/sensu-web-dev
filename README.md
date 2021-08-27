# Sensu Web Dev

- [Overview](#overview)
- [Goals](#goals)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Manual Installation](#manual-installation)
  - [Docker Compose Installation](#docker-compose-installation)
- [Completion](#completion)

# Overview

The Sensu Web Dev project is a template for developing prototype web applications for [Sensu Go](https://sensu.io).
The primary objective of this project is to provide a simple local development environment for Sensu front end engineering skills assessments (i.e. technical job interviews).

# Goals

## User Stories

We need to build a application that allows our users to manage checks within their Sensu installation.

- A user must be able to switch between namespaces.
- A user must be able to view all checks within the selected namespace.
- A user must be able to sort the list of checks. (Unless you want to, you may sort in the client.)
- A user must be able to filter the list of checks using your chosen method of fuzzy matching.
- A user must be able to delete checks. (Keep the user experience in mind.)

To get you up and running quickly, we provide a simple base application that can connect to our GraphQL service. See below for setup instructions.

Despite the very minimal canvas to get started, you are free to use any means of state management, styling, or other patterns. There are no wrong answers, this portion of the interview process is your chance to flex your skills. Show us what you've got.

## Discussion

Be prepared to discuss,

- Describe the data structures you deem necassary while building the feature.
- Discuss how you've designed the interface to be ease to use.
- Discuss how you broke the problems down and tackled them.

Bonus

Allow users to be able to view individual checks. Or, anything else you might find interesting, we love surprises.

## Time

Please try to timebox your efforts to two hours. If you don't finish that is okay; ultimately we want to understand thought process, your ability to discuss your work, and your overall skill level, not necassarily your ability to complete arbitrary tasks.

# Prerequisites

1. **Git**

   Please visit the [Git user documentation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for instructions on installing Git.

1. **Docker**

   Please visit the [Docker user documentation](https://docs.docker.com/get-docker/) for instructions on installing Docker.

1. **NodeJS & NPM**

   Please visit the [NodeJS Downloads page](https://nodejs.org/en/download/) for instructions on installing NodeJS.

   _NOTE: please verify your NodeJS installation by running the `npm --version` command._

1. **Docker Compose (optional)**

   Please visit the [Docker user documentation](https://docs.docker.com/compose/install/) for instructions on installing `docker-compose`.

## Setup

There are two ways to setup the Sensu Web Dev environment: manual installation (recommended for most users), and Docker Compose (only recommended if you're familiar with Docker Compose).

### Manual Installation

1.  **Clone this repository.**

    ```shell
    git clone https://github.com/sensu/sensu-web-dev.git
    cd sensu-web-dev
    ```

1.  **Download and start the Sensu Backend/API using Docker.**

    ```shell
    docker run -d --rm --name sensu-backend \
    -p 8080:8080 -p 3000:3000 \
    sensu/sensu:6.4.0 sensu-backend start
    ```

    _NOTE: if your Docker installation requires `root` user privileges, you may need to re-run this command with `sudo` (i.e. `sudo docker run ...`);
    Windows users may need to run `docker` commands in a shell with Administrator privileges._

    After completing this step you should be able to verify your install by visiting the Sensu web app at http://127.0.0.1:8080.

1.  **Download and configure the Sensu CLI (`sensuctl`)**

    **Mac users:**

    ```shell
    # Download sensuctl
    export SENSU_VERSION="6.4.0"
    export SENSU_USERNAME="admin"
    export SENSU_PASSWORD="P@ssw0rd!"
    curl -LO "https://s3-us-west-2.amazonaws.com/sensu.io/sensu-go/${SENSU_VERSION}/sensu-go_${SENSU_VERSION}_darwin_amd64.tar.gz"
    sudo tar -xzf "sensu-go_${SENSU_VERSION}_darwin_amd64.tar.gz" -C /usr/local/bin/
    rm sensu-go_${SENSU_VERSION}_darwin_amd64.tar.gz
    # Configure sensuctl
    sensuctl configure --non-interactive --namespace default --api-url http://127.0.0.1:8080 --username ${SENSU_USERNAME} --password ${SENSU_PASSWORD}
    ```

    **Windows users (Powershell):**

    ```powershell
    # Download sensuctl
    ${Env:SENSU_VERSION}="6.4.0"
    ${Env:SENSU_USERNAME}="admin"
    ${Env:SENSU_PASSWORD}="P@ssword!"
    Invoke-WebRequest `
      -Uri "https://s3-us-west-2.amazonaws.com/sensu.io/sensu-go/${Env:SENSU_VERSION}/sensu-go_${Env:SENSU_VERSION}_windows_amd64.zip" `
      -OutFile "${Env:UserProfile}\sensu-go_${Env:SENSU_VERSION}_windows_amd64.zip"
    Expand-Archive `
      -LiteralPath "${Env:UserProfile}\sensu-go_${Env:SENSU_VERSION}_windows_amd64.zip" `
      -DestinationPath "${Env:UserProfile}\Sensu\bin"
    ${Env:Path} += ";${Env:UserProfile}\Sensu\bin"
    # Configure sensuctl
    sensuctl configure --non-interactive --namespace default --api-url http://127.0.0.1:8080 --username ${Env:SENSU_USERNAME} --password ${Env:SENSU_PASSWORD}
    ```

    **Linux users:**

    ```shell
    # Download sensuctl
    export SENSU_VERSION="6.4.0"
    export SENSU_USERNAME="admin"
    export SENSU_PASSWORD="P@ssw0rd!"
    curl -LO "https://s3-us-west-2.amazonaws.com/sensu.io/sensu-go/${SENSU_VERSION}/sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz" && \
    sudo tar -xzf "sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz" -C /usr/local/bin/ && \
    rm "sensu-go_${SENSU_VERSION}_linux_amd64.tar.gz"
    # Configure sensuctl
    sensuctl configure --non-interactive --namespace default --api-url http://127.0.0.1:8080 --username ${SENSU_USERNAME} --password ${SENSU_PASSWORD}
    ```

1.  **Pre-seed the Sensu API with sample data.**

    ```shell
    sensuctl create -f data/sample.yaml
    sensuctl create --namespace development -f data/check
    ```

    Verify that the sample data was created using the following commands:

    - Run the `sensuctl namespace list` command.

      You should see output similar to the following:

      ```shell
      $ sensuctl namespace list
           Name
      ───────────────
        default
        development
        production
        staging
      ```

    - Run the `sensuctl check list` command.

      You should see output similar to the following:

      ```shell
      $ sensuctl check list --namespace development
      Name Command Interval Cron Timeout TTL...
      ────────────────────── ────────────────────────────────────────────── ────────── ────────────────── ───────── ─────
      crontab echo $RANDOM 0 _/5 _ \* \* 1-5 0 0 windows,kibana true false
      flap exit $((RANDOM % 3)) 180 0 0 windows,www email-me true false
      flap-threshold exit $((RANDOM % 2)) 30 0 0 windows,www email-me true false
      ```

1.  **Create a Sensu API Key.**

    - Generate a Sensu API Key using the `sensuctl api-key grant admin` command:

      ```
      $ sensuctl api-key grant admin
      Created: /api/core/v2/apikeys/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      ```

    - Add the API Key to the `.env.local` file provided in this repository:

      Copy the API key output from the `sensuctl api-key grant admin` command (the `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` part of the output) to the `.env.local` file

      ```ruby
      SENSU_API_URL="http://127.0.0.1:8080"
      SENSU_API_KEY="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      PORT=7678
      ```

1.  **Install the ReactJS project dependencies & start the sample app.**

    ```bash
    npm install
    npm start
    ```

    Verify that you have successfully completed the installation by visiting [http://127.0.0.1:7678](http://127.0.0.1:7678) in your browser.
    If you see a message like "connected to cluster running 6.4.0" then you have successfully completed this setup.

1.  **Good luck & have fun!**

### Docker Compose Installation

```bash
docker-compose up
```

# Completion

After you have completed the exercise:

1. First, ensure that all your changes have been committed.

   ```bash
   git add .
   git commit
   ```

2. Create a git bundle with all your changes.

   ```bash
   git bundle create completed-assignment.git HEAD
   ```

3. Finally, email the git bundle to the examiner.
