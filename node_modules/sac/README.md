Small and Crunchy
=================

SaC is a tiny service to take big things and make them small. It accepts requests for minified CSS or JS files, expects to find non-minified copies on-disk, and serves up the minified one you asked it for.

Installation
------------

    npm install -g sac

Usage
-----

    sac

Seriously, that's it (unless you need to change the defaults, see the section on "[Configuration](#configuration)").

SaC will launch, check the number of cores on your system, and spawn a minion for each core. It will then listen on port 40480 and accept requests for any resource ending in .min.js, or .min.css. When it gets a request, it will find the unminified file version, and respond with a minified copy.

Example
-------

Assuming default configuration...

    curl http://localhost:40480/scripts/jquery.min.js

SaC looks for jquery.js at /data/www/docroot/scripts/jquery.js

If it exists, /usr/bin/r.js is called and the result is returned in the response body with a 200 status in the header. Content-Type is set to either application/javascript or text/css, depending on the content.

HTTP Status Codes
-----------------

SaC will return reasonably sane HTTP status codes with most responses.

* 200: Success
  * This is the expected response, when everything goes as planned.
* 403: Forbidden
  * SaC will refuse requests for non-minified resources. It is a minifying asset server, after all.
* 404: Not Found
  * The file doesn't exist under the configured docroot.
* 415: Unsupported Media Type
  * The requested asset isn't of a supported type.
* 418: I'm a teapot.
  * Request did not include a specific resource. Asking to minify nothing is an interesting concept.
* 500: Error
  * Something went wrong. The response body should include details.

Configuration
-------------

SaC has some (not many) configurable options, mostly to accomodate systems that don't line up with the defaults. These are all passed in as runtime arguments.

**docroot** _(default: /data/www/docroot)_

This is where SaC expects to find the canonical assets.

    sac --docroot </path/to/docroot>

**port** _(default: 40480)_

The port SaC will listen on for connections (a web-accessible status page can be found at (port + 1)).

Attempting to bind to a port below 1024 will require root, and is generally advised against.

    sac --port <1025-65534>

**requirejs** _(default: /usr/bin/r.js)_

Since SaC uses requirejs to minify content, it needs to know where to find it. This may vary by operating system and configuration.
* On most Linux systems, requirejs installs to '/usr/bin/r.js' via npm. This is the default assumption.
* On BSD derivatives (including OSX), it is usually found at /usr/local/bin/r.js.
* On Solaris and derivatives (including SmartOS), it's probably somewhere else (/opt/local/bin/r.js or something along those lines).

If you're not sure where to find it, you can check with 'which r.js'.

    sac --requirejs /usr/local/bin/r.js
