if (Mozilla?.UITour) {
  const fxaStatus = document.getElementById('fxa-status');
  const initialFxaStatus = fxaStatus.innerHTML;

  function booleanCheck(bool) {
    return bool === true ? '✅ YES' : '⛔️ NO';
  }

  function getFxaDetails() {
    Mozilla.UITour.getConfiguration('fxa', function (config) {
      fxaStatus.innerHTML = `${config.setup === false ? initialFxaStatus : ''}
        <h2>FXA Info</h2>
        <ul>
          <li>FXA Account Signed in? ${booleanCheck(
            config.setup && config.accountStateOK,
          )}</li>
          <li>Sync Setup? ${booleanCheck(
            config?.browserServices?.sync?.setup,
          )}</li>
        </ul>
      `;

      if (config.setup === true) {
        fxaStatus.innerHTML += `
          <p>Open Sync Prefs (opens in a new tab)</p>
          <button id="sync-prefs">Open Sync Prefs</button>

          <p>Connnect another device?</p>
          <button id="connect-other-device">Connect another Device</button>

          <p>Highlights the Account status UI</p>
          <button id="highlight-account">Highlight Account Status</button>
        `;
      }

      fxaStatus.innerHTML += `
      <details>
        <summary>Debug Info</summary>
        <pre>${JSON.stringify(config, null, 4)}</pre>
      </details>
      `;

      if (config.setup === true) {
        document.getElementById('sync-prefs').onclick = function () {
          // Opens the sync prefs in a new tab.
          Mozilla.UITour.openPreferences('Sync');
        };

        document.getElementById('connect-other-device').onclick = function () {
          // This doesn't allow setting where to redirect to, so isn't likely to fit what we need.
          // If redirect_to is set as extraURLParams, it's silently ignored.
          Mozilla.UITour.showConnectAnotherDevice();
        };

        Mozilla.UITour.getConfiguration('availableTargets', function (config) {
          // This logs targets.
          console.log(config.targets);
        });

        // Toggle a highlight of the Account Status Area.
        let highlightToggleState = 0;
        const highlightButton = document.getElementById('highlight-account');
        const originalHighlightButtonText = highlightButton.innerText;

        highlightButton.onclick = function () {
          // This highlights the accountStatus.
          // If we need this we should check that the target exists in `availableTargets`
          // before showing this UI.
          if (highlightToggleState === 0) {
            Mozilla.UITour.showHighlight('accountStatus');
            highlightToggleState = 1;
            highlightButton.innerText = 'Hide Account Status Highlight';
          } else {
            Mozilla.UITour.hideHighlight();
            highlightToggleState = 0;
            highlightButton.innerText = originalHighlightButtonText;
          }
        };
      }
    });
  }

  const defaultStatus = document.getElementById('default-status');
  function getAppInfo() {
    Mozilla.UITour.getConfiguration('appinfo', function (config) {
      const isDefaultBrowser = config.defaultBrowser;

      defaultStatus.innerHTML = `
        <h2>App Info</h2>
        <ul>
          <li>Browser Version: ${config.version}</li>
          <li>Update Channel: ${config.defaultUpdateChannel}</li>
          <li>Browser is Default? ${booleanCheck(isDefaultBrowser)}</li>
        </ul>

        ${
          !isDefaultBrowser
            ? '<p>Make Firefox your default browser?</p><button id="default-browser">Set Default</button><br /><br />'
            : ''
        }

        <details>
          <summary>Debug Info</summary>
          <pre>${JSON.stringify(config, null, 4)}</pre>
        </details>

        <br />

        <button id="reset-firefox">⚠️  Reset Firefox</button>
      `;

      const defaultBrowserButton = document.getElementById('default-browser');
      if (defaultBrowserButton) {
        defaultBrowserButton.onclick = function () {
          Mozilla.UITour.setConfiguration('defaultBrowser');
        };
      }

      document.getElementById('reset-firefox').onclick = function () {
        Mozilla.UITour.resetFirefox();
      };
    });
  }

  function init() {
    getFxaDetails();
    getAppInfo();
  }

  // Check Doc is ready for UITour.
  Mozilla.UITour.ping(function () {
    document.getElementById('prefs-note').style.display = 'none';
    fxaStatus.style.display = 'block';
    console.log('UITour Ready');
    init();
  });

  document.addEventListener('focus', function () {
    console.log('Page Focused, re-checking data');
    init();
  });
}
