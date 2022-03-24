# ICPipeline: Pipeline Manager

Pipeline Manager (ICPM) is the "brain" of the ICPipeline framework, the hub of each implementation's hub-and-spokes layout.  Your Pipeline Manager is a React app that runs on the Internet Computer blockchain.  It's a console/dashboard application for managing a fleet of containerized "Worker" IC replicas -- which each team can size to fit its requirements.  Workers are fully-functioning IC replicas and dfx workstations, each running on an Ubuntu Linux base.  Each Worker runs the ICPipeline "Uplink" module.  Uplink, written in Node, is the communications and orchestration layer that essentially makes a Worker a Worker.  Uplink is how your Workers talk to your Pipeline Manager, and how the work is assigned.  BTW, even if you're a solo developer with a "fleet" consisting of a single Worker, we think you'll find that ICPipeline is still awesomely useful.

![icpipeline-manager-overview.png](https://icpipeline.com/media/documentation/icpipeline-manager-overview.png)
<p align="center" style="color:gray;font-size:14px;"> <b>Figure 2: ICPipeline Manager (ICPM) Overview</b> </p>


### Getting Started:
ICPipeline can help you to gain a baseline comfort level with the Internet Computer, its core concepts and workflows.  The IC is a blockchain, and some things really are different over here.  But the knowledge is available and very digestible.  So, even if you're very new to blockchain and/or to the IC, this is all very doable.  Indeed, this is an excellent way to get started.  The twists and turns we encountered on our own journey are exactly the motivation behind ICPipeline.  That shared learning curve is literally baked right into the framework.

We recommend that you start by exploring the ICPipeline project directory structure, the default configuration files, etc.  Read the READMEs, including this one.  Spend time with the Additional Reading list below.  One of the great things about Dfinity and the IC is that there's a real breadcrumb trail for the truly curious.  So ask the questions.

This Pipeline Manager repository is one submodule of the complete ICPipeline repo, which includes an installer program.  The installer will stand up your ICPipeline, running and ready for work, in just a few minutes.  Even if you currently have no IC projects, you can start by installing ICPipeline, and then use it to deploy one of the available sample projects.  You can do that right now.  You can learn a ton from a "Hello World" exercise, without writing a single line of code, in 30 minutes or less.  To use ICPipeline, you should review the READMEs in each module.

If you've completed your ICPipeline installation, read on for more information on Pipeline Manager.


### ICPipeline: Framework Outline and Glossary of Terms
ICPipeline vocabulary is straightforward.


- **Project**: Each ICPipeline Project represents a real-life IC project -- your new web site, your de-fi d'app, your social network, whatever it is that you're building.  To manage your project using ICPipeline, simply "create" it in your ICPipeline Manager by filling in a few form fields -- most important of which is the GitHub URL for the project repo.  Paste that link into your ICPipeline Project, and ICpipeline will be ready to clone, build and deploy any (or every) branch of your project repo.

  **Be sure to paste your clipboard directly from GitHub's "Copy" -- including the "https://" prefix**.

- **Environment**: Each ICPipeline Environment ties together all the components necessary to deploy:
	- a **Project** *is* the work, including the Git repo.
	- a **Worker** *does* the work.
	- an **Environment** ties everything together, including the specific repo branch.
	- **Pipeline Manager** is where you control everything.

Everything aligns directly with your real-world workflows.  Your Environments will generally correlate with standard CI/CD pipeline tiers.  While you can certainly name them however you like, *Dev1*, *QA2*, *Staging*, etc. are typical Environment names.  That's the approach we take, anyway -- let us know what you come up with.

- **Worker**: As mentioned, each ICPipeline *Worker* is a Docker container.  Each *Worker* runs Ubuntu Linux, Node/NPM, Git, and the Dfinity Canister SDK, aka DFX.  Additionally running on every Worker is ICPipeline *Uplink*, executing Jobs as they are assigned to it.

- **Deployment**: To do a Deployment, you just click a button.  A Deployment is definitely a thing, with multiple moving pieces.  But you just click "Deploy Now", and that's it.  To deploy any Environment with an assigned Project and a registered Worker, just click the button.  After allowing a few moments for clone/build/deploy, launch a browser to view the happy results.  That is assuming your project code works ;).  But even if it needs a tweak, you can log directly into the Worker, make the fix and push the change to GitHub.  Then you're ready to deploy again.


#### Authentication/Login with Pipeline Manager (Important)
Your initial login to a new Pipeline Manager requires a master passcode.  A default master passcode is included.  Use the default passcode for your initial login to Pipeline Manager, and then:

A) Change your master passcode and store it securely as such.
B) Switch right over to Internet Identity authentication and use that going forward.  A similar principle applies in AWS, where you start with a "root user" credential and move directly to IAM roles.

There is an additional element in play here, a bit of *chicken/egg*, which we took this approach to solving.  The basic wrinkle is that *anyone* can acquire an Internet Identity.  *But* no one outside your team should ever be able to log into your ICPM.  So, to have the best of both worlds, Pipeline Manager (with a thumbs-up from the Dfinity team) adopts a *whitelist* approach.  Every Internet Identity maps to a *principal* (strictly speaking, it's an alphanumeric *represention* of a principal, which is a distinction worth noting).  Your master passcode, in addition to enabling initial login, enables its holder(s) to administer ICPM's internal whitelist of your team members' principals.  Each authorized team member should have or [acquire an Internet Identity](https://identity.ic0.app/), thus having the *principal* associated with that identity.  Each team member's principal can then be added to the whitelist, qualifying that person for login to ICPM (specifically *your* ICPM, not any other).  This way your whole team enjoys the benefits of Internet Identity (while also gaining valuable exposure).  At the same time, however, *not just anybody* with an Internet Identity will ever be able to come along and log into your Pipeline Manager.

#### ICPipeline and Internet Identity
Dfinity has merged their proprietary chain-key cryptography with evolving WebAuthn standards to create Internet Identity.   In a nutshell, Internet Identity is blockchain-based biometric (e.g. fingerprint) authentication that creates a unique relationship between one person, one client device and one Internet Computer d'app.  As the holder of an Internet Identity (it's free, [here](https://identity.ic0.app/)), you and your multiple devices can authenticate with any IC endpoint -- securely, anonymously, untrackable from site to site.  And its passwordless, ultra-low-friction UX makes it genuinely viable for wide-scale adoption.  We are fans.

**In the context of ICPipeline, Internet Identity integration is on two main levels:**
- First, it's built into ICPM, where you and your team will use it to authenticate when administering your ICPipeline.
- Second, ICPipeline makes it *much* easier for you to build Internet Identity into your own IC projects.
  - Internet Identity (being an authentication protocol) entails a host/client handshake.
  - In order to develop, integrate, iterate, break stuff etc., you need a replica backend host to bang away on.
  - So ICPipeline enables you to "II-enable" any ICPipeline Worker(s) (i.e. convert it into that replica backend) by just checking a box.

Now, quite a few things happen when you check that "II-enable" box.  And *by all means*, you still want to do the reading and be prepared to roll up your sleeves.  But this makes it *so* much easier for teams to gain a foothold in Internet Identity integration.  And we think that is good for everyone.

There are some things you should know about ICPipeline, Internet Identity, WebAuthn (the standard on which II is based) etc.

As mentioned, Internet Identity is an extended implementation of the WebAuthn standard.  You should be aware that **WebAuthn likes hostnames, not IP addresses**.  So the bottom line is that you should assign hostnames to your II-enabled Workers.  Your calls/queries to your II replica canister won't work if the Worker's IP address is used in lieu of a proper hostname (e.g. 10.100.1.123 vs. *rick.morty.xyz*).  If circumstances allow you to handle this with DNS records, that's great.  Otherwise, /etc/hosts file entries will do just as well.  This does fall more into the realm of sys/network/devops admin.  If, as a developer, you need a hand with this, reach out to us directly.  We're always glad to help, and that goes double if you're deep in these weeds; it's where we want ICPipeline to be.  We will definitely take the opportunity to try and pick your brain as well.


#### Projects, Environments and Canisters on the IC
ICPipeline generally observes the recommended practice of preserving and reusing IC canisters in cases where it makes sense to do so.  For instance, if you perform multiple IC deployments of a given Project, the same canisters should be used and reused -- as opposed to standing up new canisters with each deployment.  This definitely saves your cycles, it's faster and more efficient in terms of IC overhead and resources, and it makes sense in other ways too.  Your SEOs, for example, will be glad that your website doesn't end up with an arbitrary new URL each time it's redeployed.  All in all, preserving and reusing canisters is a good practice that ICPipeline adheres to, and this explains how.

Of your four core Environment types -- Dev, QA, Stage and Prod -- only the latter two types support "--network ic" deployment to the live IC.  By design, Environments of types Dev and QA do not support that option.  Likewise, any given Project can have one and only one Environment of each of those types (Stage and Prod) at a given time.  The initial IC deployment of any such Environment/Project creates new IC canisters.  Said canisters are designated as *the* canisters for that tier (i.e. Stage or Prod, as the case may be) of that Project/Environment.  Even if you flush and replace ephemeral Workers, those assigned canister IDs will persist -- a canister set for Stage, a set for Prod -- for the life of the relationship between the Project and the Environment.  That is, unless you intercede, which is easy if the circumstances require it.

### Automated Behaviors in the Framework
There are some things that happen automatically, under the covers.  They This explains the basics, mainly with respect to communications and interaction between Workers and Managers.

**Worker Registration:**
Every new Worker automatically *registers*, at "birth", with its designated Manager.  A Worker will register *only* with *its* specified Manager instance (ICPM's canister ID is dynamically embedded in the Worker's core config).  This is automatic and invisible, so, other than verifying, there's no need to worry about it.  From ICPM's perspective, a Worker is a Worker is a Worker -- they're just compute cycles, available to be tasked.  There is one scenario where *any* data will exist non-redundantly on a single Worker: that's if/when development work takes place directly on a Worker (which it certainly can), before such work has been pushed to GitHub (straight from the Worker, which it also certain can).  This is no different than working on your laptop or any other workstation.  We point it out as the one use case in which a Worker is not entirely disposable.  Other than that, you can break them with abandon, which is something we really enjoy.

**Assignment of Workers to Environments:**
Once having registered, Workers are automatically paired with Environments by their Managers.  When you create an Environment in your Pipeline Manager, the Manager (which is always "listening" for available Workers) will automatically assign the next available Worker to the new Environment.  A Worker is available when it has registered, but has not yet been assigned to an Environment.  This matching/pairing algorithm is ongoing, automatic and transparent.  Any *registered* Worker that is not assigned to an Environment will *be* assigned automatically by its Manager to the next "available" Environment.  As a user, you don't need to worry about it; your Manager Dashboard will just display that everything is connected.

**Git Repos and Branches:**
Note that GitHub repositories are specified at the *Project* level in ICPipeline.  So you add your repo URLs to your Projects in ICPM.  However, you designate repo *branches* at the *Environment* level.  You specify *main*, *dev*, etc. in your Environment configurations.  We think this is a *common-sense* way of allowing for different branches to be distributed across multiple Environments at the same time.  E.g. "Dev is on DEV02", QA is on QA1", etc.  It's fairly obvious when you see it, and simpler than this makes it sound.  We just thought we should mention that it's this way on-purpose.


### Deployment to the Internet Computer Mainnet With ICPipeline
ICPipeline makes it easy to grow your *dev/QA* pipeline, via an unlimited number of network-available IC replica Workers.  If you additionally wish to have *stage* and *prod* tiers in your pipeline, i.e. network-deploy to the live IC, ICPipeline can do that too.  It's at your option, and this is an outline of how it works.

- We create a new "icpipeline" Internet Computer principal/identity.  This new principal is effectively your alias and proxy.  Your Workers authenticate with the IC using this identity.
- You authorize the new icpipeline principal as a controller of your cycles wallet -- live deployments require cycles, and your Workers will need them to fund the canisters that will host your projects on the IC.
- We import the new principal configuration into ICPipeline, which stores it securely on the blockchain -- Pipeline Manager can then temporarily allocate the necessary credentials to any Worker, based on the specifics of a given task.

This is how your Workers are able to transact with the IC on your behalf.  So the installer (after backing up your local config) imports the icpipeline principal into your container image build, enabling your Worker Dockers to assume that principal/identity when deploying to the IC on your behalf.  No modification is made to your local identity config; the installer just needs a snapshot of the icpipeline principal.  That's the approach in broad strokes; feel free to touch base if we can explain in more detail.

To be clear, this section refers specifically to enabling ICPipeline to deploy *your* projects to the Internet Computer.  The installer also builds and deploys your Pipeline Manager d'app to the IC, but that's completely independent from this.  Successful deployment of your Pipeline Manager does *not* require you to "Enable IC deployment", create a new principal, etc.  Your scripted Pipeline Manager deployment simply runs the *dfx* commands "as" the principal (*dfx identity whoami*) that is active in the terminal session where the installer is run.



**A Cautionary Note Regarding "Retired" Workers:** Your Manager Dashboard allows you to decommission any Worker at any time.  However, ICPipeline (at initial release) does not yet have a native mechanism to stop the actual underlying Docker containers.  So you will need to stop these containers via Docker or your container orchestration tools. This is important to understand, just until we've built this capability into ICPipeline directly.  We are on it.

**Additional Reading**
If you are new to the Internet Computer, we recommend that you should review Dfinity's core documentation, which is well-done and very readable:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app)
