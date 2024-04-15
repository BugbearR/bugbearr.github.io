(function () {
    // simple but not perfect hostname validation
    function isValidHostnameByUrl(hostname) {
        try {
            if (!hostname) {
                return false;
            }
            if (hostname.indexOf(":") >= 0) {
                return false;
            }
            if (hostname.endsWith("/")) {
                return false;
            }
            const url = new URL(`http://${hostname}`);
            if (url.username || url.password || url.port !== "" || ( url.pathname !== "" && url.pathname !== "/" ) || url.search || url.hash) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    function isValidSubDomain(subDomain) {
        // RFC 1035 2.3.1
        if ( subDomain.length < 1 || subDomain.length > 63 ) {
            return false;
        }

        if ( ! ( /^[a-zA-Z][a-zA-Z0-9-]*$/ ).test( subDomain ) ) {
            return false;
        }

        if ( ( /-$/ ).test( subDomain ) ) {
            return false;
        }

        const subDomainWk = subDomain.startsWith( "xn--" ) ? subDomain.slice( 4 ) : subDomain;
        if ( ( /--/ ).test( subDomainWk ) ) {
            return false;
        }
        return true;
    }

    function isValidHostnameByRegex(hostname) {
        if (!hostname) {
            return false;
        }

        // RFC 1035 2.3.1 and last dot is optional
        const hostnameWk = ( hostname[hostname.length - 1] === "." ) ? hostname.slice( 0, -1 ) : hostname;
        if (hostnameWk.length < 1 || hostnameWk.length > 253) {
            return false;
        }

        const items = hostnameWk.split( "." );
        if ( items.length === 0 ) {
            return false;
        }
        for ( let i = 0; i < items.length; i++ ) {
            if ( ! isValidSubDomain( items[i] ) ) {
                return false;
            }
        }
        return true;
    }

    function init() {
        document.getElementById("validateButton").addEventListener("click", function() {
            var hostname = document.getElementById("hostname").value;
            document.getElementById("resultByUrl").textContent = isValidHostnameByUrl(hostname).toString();
            document.getElementById("resultByRegex").textContent = isValidHostnameByRegex(hostname).toString();
        });
    }

    window.addEventListener("DOMContentLoaded", init);
})();
