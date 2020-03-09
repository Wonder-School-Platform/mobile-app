# Wonder School App - Mobile App
Mobile App for School Communication Platform. This is a React Native Project to deliver a mobile experience to school parents, in Android and iOS.

Before starting, do the following:
- Install the Gitflow tool, [see below for instructions.](#gitflow)

## Gitflow - the tool {#giflow}
The Gitflow tool is a collection of Git extensions to provide high-level repository operations for Vincent Driessen's branching model. It makes your life easier as it executes some repetitive commands so that you don't have to. For example, when you finish a feature it makes sure that it merges it back to develop and deletes it. This tool saves you some keystrokes and makes sure you don't miss a step when following the Gitflow model.

### Installing on MacOs
On Mac it's literally a simple `brew install git-flow-avh`.

### Installing in Windows
Follow the instructions on the Git for Windows homepage to install Git for Windows. As of Git for Windows 2.6.4, GitFlow (AVH edition) is included, so you're all done.

### Windows Subsystem for Linux
If you are using Windows Subsystem for Linux, run this command `wget -q  https://raw.githubusercontent.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh && sudo bash gitflow-installer.sh install stable; rm gitflow-installer.sh` or [follow this documentation.](https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Linux,-Unix,-etc)

### More information on the Gitflow tool
For more detailed information on the Gitflow tool and how to get started, [check this tutorial.](https://dev.to/nikola/git-branching-done-right-with-gitflow--improving-code-quality-with-code-reviews)

### Getting Started with Gitflow tool
If you are on the **develop** branch and want to start developing a new feature, run this command: `git-flow feature start replace_with_feature_name`

Once you are finished with the development of the branch, run `git-flow feature finish replace_with_feature_name`. What this command then will do is:
- it'll merge the replace_with_feature_name branch to the develop branch
- it'll delete the replace_with_feature_name branch locally
- it'll checked out out the develop branch so you can continue working

If you are happy with your feature and want to make a realease, first execute: `git-flow release start 1.0` (replace the **1.0** with your desired version of the release)

After this, you can do any last potential fixes, version updates, etc.. When done, execute `git-flow release finish 1.0`. You will need to add few merge messages and a tag message, but when that is done Gitflow tool will:

- merge the release branch to master
- tag the release branch as 1.0
- merge the release branch to develop
- delete the release branch
- check out the develop branch