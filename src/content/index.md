---
layout: base
---

<a href="https://firefox-source-docs.mozilla.org/browser/components/uitour/docs/UITour-lib.html" target="_blank">UI Tour Docs</a>

<div id="prefs-note" class="note">
  <p>To test this out, you'll need to set the following prefs:</p>
  <ul>
    <li><p><code>browser.uitour.testingOrigins</code> (String) set to <code>http://localhost:{{ config.port }}</code></p></li>
    <li><p><code>browser.uitour.requireSecure</code> (Bool) switched to <code>false</code></p></li>
  </ul>
</div>

<div id="fxa-status">
  <div id="fxa-signup">
    <h2>Create an FXA Account</h2>
    <form action="{{ config.FXAServerURL }}">
      <p>Enter your email adress to get started</p>
      <input type="email" name="email" placeholder="user@example.com" required="">
      <input type="hidden" name="form_type" value="email">
      <input type="hidden" name="redirect_to" value="http://localhost:{{ config.port }}">
      <input type="hidden" name="service" value="sync">
      <input type="hidden" name="context" value="fx_desktop_v3">
      <input type="hidden" name="entrypoint" value="{{ config.FXAEntryPoint }}">
      <p>
        By proceeding, you agree to the <a href="https://accounts.firefox.com/legal/terms">Terms of Service</a> and <a href="https://accounts.firefox.com/legal/privacy">Privacy Notice</a>.
      </p>
      <button type="submit">Continue</button>
    </form>
    <p class="fxa-signin">Already have an account? <a href="{{ config.UseLocalFXA and config.FXAServerLocalURL or config.FXAServerProdURL }}/signin?&redirect_immediately=true&context=fx_desktop_v3&entrypoint={{ config.FXAEntryPoint }}&action=email&service=sync&redirect_to=http://localhost:{{ config.port }}" role="button">Sign In</a></p>
  </div>
</div>
<div id="default-status"></div>
