import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const screenshotsDir = path.resolve(rootDir, 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const SCREENS = [
  // Volunteer Mobile Screens (390 x 844)
  { name: '01_volunteer_login.png', path: '/volunteer/login', viewport: { width: 390, height: 844 }, role: 'Volunteer', title: 'Volunteer Login' },
  { name: '02_volunteer_punch_in.png', path: '/volunteer/punch-in', viewport: { width: 390, height: 844 }, role: 'Volunteer', title: 'Field Punch-in' },
  { name: '03_volunteer_dashboard.png', path: '/volunteer/dashboard', viewport: { width: 390, height: 844 }, role: 'Volunteer', title: 'Volunteer Dashboard' },
  { name: '04_volunteer_calendar.png', path: '/volunteer/calendar', viewport: { width: 390, height: 844 }, role: 'Volunteer', title: 'Attendance Calendar' },
  { name: '05_volunteer_activity_select.png', path: '/volunteer/activity-select', viewport: { width: 390, height: 844 }, role: 'Volunteer', title: 'Activity Selection' },
  { name: '06_volunteer_school_form.png', path: '/volunteer/school-form', viewport: { width: 390, height: 844 }, role: 'Volunteer', title: 'School Visit Form' },
  { name: '07_volunteer_route_history.png', path: '/volunteer/route-history', viewport: { width: 390, height: 844 }, role: 'Volunteer', title: 'Route History' },
  { name: '08_volunteer_punch_out.png', path: '/volunteer/punch-out', viewport: { width: 390, height: 844 }, role: 'Volunteer', title: 'Punch-out & Daily Summary' },

  // Manager Mobile Screens (390 x 844)
  { name: '09_manager_dashboard.png', path: '/manager/dashboard', viewport: { width: 390, height: 844 }, role: 'Manager', title: 'Manager Dashboard' },
  { name: '10_manager_punch_in.png', path: '/manager/punch-in', viewport: { width: 390, height: 844 }, role: 'Manager', title: 'Manager Punch-in' },
  { name: '11_manager_volunteer_performance.png', path: '/manager/volunteers', viewport: { width: 390, height: 844 }, role: 'Manager', title: 'Volunteer Performance' },
  { name: '12_manager_team_performance.png', path: '/manager/team-performance', viewport: { width: 390, height: 844 }, role: 'Manager', title: 'Team Performance' },
  { name: '13_manager_monthly_report.png', path: '/manager/monthly-report', viewport: { width: 390, height: 844 }, role: 'Manager', title: 'Monthly Report' },
  { name: '14_manager_day_summary.png', path: '/manager/day-summary', viewport: { width: 390, height: 844 }, role: 'Manager', title: 'Day Summary Report' },
  { name: '15_manager_route_history.png', path: '/manager/route-history', viewport: { width: 390, height: 844 }, role: 'Manager', title: 'Volunteer Route History' },

  // Admin Web Desktop Screens (1440 x 900)
  { name: '16_admin_dashboard.png', path: '/admin/dashboard', viewport: { width: 1440, height: 900 }, role: 'Admin', title: 'Admin Executive Dashboard' },
  { name: '17_admin_users.png', path: '/admin/users', viewport: { width: 1440, height: 900 }, role: 'Admin', title: 'User Management' },
  { name: '18_admin_schools.png', path: '/admin/schools', viewport: { width: 1440, height: 900 }, role: 'Admin', title: 'School Registry' },
  { name: '19_admin_managers_orgs.png', path: '/admin/managers-orgs', viewport: { width: 1440, height: 900 }, role: 'Admin', title: 'Manager & NGO Matrix' },
  { name: '20_admin_reports.png', path: '/admin/reports', viewport: { width: 1440, height: 900 }, role: 'Admin', title: 'Admin Reports Hub' },
  { name: '21_admin_master_data.png', path: '/admin/master-data', viewport: { width: 1440, height: 900 }, role: 'Admin', title: 'Master Data Taxonomy' },

  // Showcase & Landing
  { name: '22_showcase_gallery.png', path: '/showcase', viewport: { width: 1440, height: 900 }, role: 'Presentation', title: 'Screen Showcase Gallery' },
  { name: '23_landing_portal.png', path: '/', viewport: { width: 1440, height: 900 }, role: 'Presentation', title: 'Landing Demo Portal' },
];

async function capture() {
  console.log('Starting preview server...');
  const server = spawn('npm.cmd', ['run', 'preview', '--', '--port', '4173'], {
    cwd: rootDir,
    stdio: 'ignore',
    shell: true
  });

  // Wait 3s for server to spin up
  await new Promise(r => setTimeout(r, 3000));

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    console.log('Chromium launch failed, trying with system channel msedge or chrome...');
    try {
      browser = await chromium.launch({ channel: 'msedge', headless: true });
    } catch (e2) {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    }
  }

  const baseUrl = 'http://localhost:4173';
  console.log(`Capturing ${SCREENS.length} screens from ${baseUrl}...`);

  for (const item of SCREENS) {
    console.log(`Capturing [${item.role}] ${item.title}...`);
    const page = await browser.newPage({
      viewport: item.viewport,
      deviceScaleFactor: 2
    });

    try {
      await page.goto(`${baseUrl}${item.path}`, { waitUntil: 'networkidle', timeout: 15000 });
      // Give charts and components a moment to settle
      await page.waitForTimeout(600);

      const filePath = path.join(screenshotsDir, item.name);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Saved: screenshots/${item.name}`);
    } catch (e) {
      console.error(`Failed to capture ${item.name}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.kill();

  // Create an HTML Gallery Index in screenshots/index.html
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MARI Field Monitoring Prototype — Screenshot Gallery</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    h1 { margin-bottom: 4px; }
    p { color: #94a3b8; font-size: 14px; margin-top: 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; margin-top: 24px; }
    .card { background: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; }
    .card img { width: 100%; display: block; border-bottom: 1px solid #334155; }
    .card-info { padding: 16px; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; }
    .badge-vol { background: rgba(16, 185, 129, 0.2); color: #34d399; }
    .badge-mgr { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
    .badge-adm { background: rgba(99, 102, 241, 0.2); color: #818cf8; }
    .badge-pres { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
    .title { font-weight: bold; font-size: 15px; margin: 0; color: #fff; }
  </style>
</head>
<body>
  <h1>MARI Field Monitoring App — Captured Prototype Screenshots</h1>
  <p>Static frontend prototype screens for ITC Mission Sunehra Kal & MARI Field Monitoring</p>
  <div class="grid">
    ${SCREENS.map(s => `
      <div class="card">
        <a href="${s.name}" target="_blank">
          <img src="${s.name}" alt="${s.title}" loading="lazy" />
        </a>
        <div class="card-info">
          <span class="badge ${s.role === 'Volunteer' ? 'badge-vol' : s.role === 'Manager' ? 'badge-mgr' : s.role === 'Admin' ? 'badge-adm' : 'badge-pres'}">${s.role}</span>
          <h3 class="title">${s.title}</h3>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(screenshotsDir, 'index.html'), htmlContent);
  console.log('Saved screenshots/index.html');
  console.log('Screenshot capture completed successfully!');
}

capture().catch(err => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
