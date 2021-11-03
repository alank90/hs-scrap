# Vue 3 + Vite + vite-setup.cmd

&nbsp;&nbsp;This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more. It is designed to be cloned from the command line by the _vite-setup.cmd_ script.
&nbsp;&nbsp;The _vite-setup.cmd_ script will download this file from Github and install all the dependencies. It will also add a remote repo for your new project and push it to Github. The added benefit of using vite-setup is that the **eslintrc.js** & **prettierrc.js** config files are also downloaded and configured with standard defaults.

### vite-setup.cmd requirements
&nbsp;&nbsp;[Github CLI](https://github.com/cli/cli) (e.g.,**gh**) is GitHub on the command line. It brings pull requests, issues, and other GitHub concepts to the terminal next to where you are already working with git and your code. It enables us to create a _remote repo_ of the cloned vite project. This is done in the ***vite-setup*** script so you dont have to create a remote repo of your new project yourself.

&nbsp;&nbsp;The easiest way to install _gh_ is thru chocolaty. At admin command line issue -

_choco install gh_

&nbsp;&nbsp;We also use the _npm-check-updates_ to update all packages to latest versions for each new project. Unfortunately as of this writing we also have to run _npm install vue@next_ seperately to insure latest version of vue is installed for the new project.

## Google Sheets Key

https://docs.google.com/spreadsheets/d/e/2PACX-1vRaQMAjTTNGL1262_zV_dSHS_M_nlu29MlZpHuBoa4nsBnGA1JMu8W60Ur2756PgBMNrL0v6CvMyCDI/pub?output=csv






