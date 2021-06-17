const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

//const proxyUrl = "http://gate.dc.smartproxy.com:20000";
//const username = "dcuser1";
//const password = "dcuser1";

const proxyUrl = "184.174.66.91:3944";
const username = "Qr6AEq4148";
const password = "CalFKw3Iny";

puppeteer.use(StealthPlugin());

async function crawl(browser) {
    const query = process.argv[2];
    const lat = process.argv[3];
    const lng = process.argv[4];

    const page = await browser.newPage();

    await page.authenticate({ username, password });
    await page.goto("https://www.google.com/?hl=en", { timeout: 9000 });

    const inputHandle = await page.waitForXPath("//input[@name = 'q']");
    await inputHandle.type("setrequestinterception", { delay: 100 });

    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    await page.waitFor(1000000);

    await browser.close();
}

puppeteer
    .launch({
        headless: false,
        executablePath: "./node_modules/puppeteer/.local-chromium/linux-884014/chrome-linux/chrome",
        ignoreHTTPSErrors: true,
        args: [
            `--proxy-server=${proxyUrl}`,
            "--start-fullscreen",
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    })
    .then(crawl)
    .catch(error => {
        console.error(error);
        process.exit();
    });
