<?php
// Server diagnostic — visit /server-check.php on your Apache host.
// DELETE THIS FILE after debugging — it exposes server internals.

header('Content-Type: text/html; charset=utf-8');

$apacheModules = function_exists('apache_get_modules') ? apache_get_modules() : null;
$rewriteLoaded = $apacheModules ? in_array('mod_rewrite', $apacheModules) : null;
$serverSoftware = $_SERVER['SERVER_SOFTWARE'] ?? 'unknown';
$htaccessHeader = $_SERVER['HTTP_X_HTACCESS_PROBE'] ?? null; // set by .htaccess RequestHeader
$rewriteBaseEnv = $_SERVER['HTACCESS_ACTIVE'] ?? getenv('HTACCESS_ACTIVE') ?: null;
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Server Check</title>
<style>
  body{font-family:system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1rem;color:#111}
  h1{font-size:1.4rem}
  table{border-collapse:collapse;width:100%;margin:1rem 0}
  td,th{border:1px solid #ddd;padding:.5rem .75rem;text-align:left;font-size:.9rem}
  th{background:#f5f5f5}
  .ok{color:#0a7d2c;font-weight:600}
  .bad{color:#c12;font-weight:600}
  .warn{color:#b67500;font-weight:600}
  pre{background:#f5f5f5;padding:1rem;overflow:auto;font-size:.8rem}
  .note{background:#fff8e1;border-left:4px solid #fb0;padding:.75rem 1rem;margin:1rem 0}
</style></head>
<body>
<h1>Apache / .htaccess Diagnostic</h1>

<div class="note"><strong>Delete this file (<code>server-check.php</code>) after debugging.</strong> It exposes server configuration.</div>

<table>
  <tr><th>Server software</th><td><?= htmlspecialchars($serverSoftware) ?></td></tr>
  <tr><th>PHP version</th><td><?= PHP_VERSION ?></td></tr>
  <tr>
    <th>mod_rewrite loaded?</th>
    <td>
      <?php if ($rewriteLoaded === true): ?>
        <span class="ok">YES</span> — mod_rewrite is active.
      <?php elseif ($rewriteLoaded === false): ?>
        <span class="bad">NO</span> — mod_rewrite is NOT loaded. Contact your host.
      <?php else: ?>
        <span class="warn">UNKNOWN</span> — apache_get_modules() unavailable (likely PHP-FPM). See phpinfo() below and search for <code>mod_rewrite</code>.
      <?php endif; ?>
    </td>
  </tr>
  <tr>
    <th>.htaccess being read?</th>
    <td>
      <?php if ($htaccessHeader === 'yes'): ?>
        <span class="ok">YES</span> — the <code>RequestHeader set X-Htaccess-Probe yes</code> rule from .htaccess fired.
      <?php else: ?>
        <span class="bad">NO / UNKNOWN</span> — the probe header was not set. Either <code>AllowOverride</code> is <code>None</code>, mod_headers is missing, or the .htaccess wasn't deployed.
      <?php endif; ?>
    </td>
  </tr>
  <tr>
    <th>HTACCESS_ACTIVE env var</th>
    <td>
      <?php if ($rewriteBaseEnv === '1'): ?>
        <span class="ok">YES</span> — set by <code>SetEnv</code> in .htaccess. AllowOverride permits <code>FileInfo</code>/<code>Options</code>.
      <?php else: ?>
        <span class="bad">no</span> — .htaccess SetEnv did not run.
      <?php endif; ?>
    </td>
  </tr>
  <tr><th>Document root</th><td><?= htmlspecialchars($_SERVER['DOCUMENT_ROOT'] ?? '?') ?></td></tr>
  <tr><th>Request URI</th><td><?= htmlspecialchars($_SERVER['REQUEST_URI'] ?? '?') ?></td></tr>
</table>

<h2>Loaded Apache modules</h2>
<?php if ($apacheModules): ?>
  <pre><?= htmlspecialchars(implode("\n", $apacheModules)) ?></pre>
<?php else: ?>
  <p class="warn">apache_get_modules() not available in this SAPI (<?= PHP_SAPI ?>). Run phpinfo() and search the page for "mod_rewrite", "Loaded Modules", or "AllowOverride".</p>
  <details><summary>Show phpinfo()</summary><?php phpinfo(INFO_MODULES); ?></details>
<?php endif; ?>

<h2>How to interpret</h2>
<ul>
  <li>If <strong>mod_rewrite = NO</strong>: ask your host to enable it. Nothing in .htaccess RewriteRule will work.</li>
  <li>If <strong>.htaccess being read = NO</strong>: AllowOverride is set to <code>None</code> in the host's vhost config. Ask support to set <code>AllowOverride All</code> for your document root.</li>
  <li>If both are <strong>YES</strong> but /resources still lists files: hard-refresh (Ctrl+Shift+R), then check this file's response headers in DevTools → Network for <code>X-Htaccess-Active: yes</code>.</li>
</ul>
</body></html>
