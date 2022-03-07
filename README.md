# Vue 3 + Vite + vite-setup.cmd

&nbsp;&nbsp;This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more. It is designed to be cloned from the command line by the _vite-setup.cmd_ script.
&nbsp;&nbsp;The _vite-setup.cmd_ script will download this file from Github and install all the dependencies. It will also add a remote repo for your new project and push it to Github. The added benefit of using vite-setup is that the **eslintrc.js** & **prettierrc.js** config files are also downloaded and configured with standard defaults.

## Setting up environment variables for project w/Vite

Create a file named ***.env.local*** in root of project. Add the following to the file:

```
VITE_AUTH0_DOMAIN=apixxxxxxxxxxx
VITE_AUTH0_CLIENT_ID=idxxxxxxxxxx
```

The env variables can be accessed in the code with the special Vite object **import.meta.env**. So here we define a config object as

```
const config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
};
```
Now ***config.domain*** will contain the Auth0 domain to use in the component.

**Note** - The *env.local* file is never backed up to github on a commit
     because of the .gitignore entry. So remember you must *add the .env.local file*
     *yourself on each computer that you work on this project with*.
## vite-setup.cmd requirements
&nbsp;&nbsp;[Github CLI](https://github.com/cli/cli) (e.g.,**gh**) is GitHub on the command line. It brings pull requests, issues, and other GitHub concepts to the terminal next to where you are already working with git and your code. It enables us to create a _remote repo_ of the cloned vite project. This is done in the ***vite-setup*** script so you dont have to create a remote repo of your new project yourself.

&nbsp;&nbsp;The easiest way to install _gh_ is thru chocolaty. At admin command line issue -

_choco install gh_

&nbsp;&nbsp;We also use the _npm-check-updates_ to update all packages to latest versions for each new project. Unfortunately as of this writing we also have to run _npm install vue@next_ seperately to insure latest version of vue is installed for the new project.

## Google Sheets Key

https://docs.google.com/spreadsheets/d/e/2PACX-1vRaQMAjTTNGL1262_zV_dSHS_M_nlu29MlZpHuBoa4nsBnGA1JMu8W60Ur2756PgBMNrL0v6CvMyCDI/pub?output=csv






