/*globals requireClass */
const WebBrowser = function() {};
WebBrowser.show = function(page, options) {

    if (!(options && options.url && (options.url.startsWith("https://") || options.url.startsWith("http://")))) {
        throw new Error("The specified URL has an unsupported scheme. Only HTTP and HTTPS URLs are supported.");
    } else {
        const NativeCustomTabsIntent = requireClass("androidx.browser.customtabs.CustomTabsIntent");
        // const NativeCustomTabsServiceConnection = requireClass("androidx.browser.customtabs.CustomTabsServiceConnection");
        // const NativeCustomTabsClient = requireClass("androidx.browser.customtabs.CustomTabsClient");
        const NativeUri = requireClass("android.net.Uri");
        // const NativeIntent = requireClass("android.content.Intent");
        const spratAndroidActivityInstance = requireClass("io.smartface.android.SpratAndroidActivity").getInstance();
        // const NativePendingIntent = requireClass("android.app.PendingIntent");

        var builder = new NativeCustomTabsIntent.Builder();
        builder.setToolbarColor(options.barColor.nativeObject);
        builder.setShowTitle(true);

        // var shareIntent = new NativeIntent(NativeIntent.ACTION_SEND);
        // shareIntent.setType("text/plain");
        // shareIntent.putExtra(NativeIntent.EXTRA_TEXT, options.url);
        // builder.addMenuItem("Share", NativePendingIntent.getActivity(spratAndroidActivityInstance, 0, shareIntent, 0));

        try {
            var customTabsIntent = builder.build();
            customTabsIntent.launchUrl(spratAndroidActivityInstance, NativeUri.parse(options.url));
        } catch (e) {
            throw new Error("" + e);
        }
    }
};
WebBrowser.Options = require("./webbrowseroptions");

module.exports = WebBrowser;