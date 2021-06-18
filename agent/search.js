const axios = require("axios");

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const secretKey = process.env["SECRET_KEY"];
const proxyID = process.env["PROXY_ID"];
const keywordID = process.env["KEYWORD_ID"];

const proxyUrl = process.env["PROXY_URL"];
const username = process.env["USERNAME"];
const password = process.env["PASSWORD"];

console.log("************* Agent starting *************");
console.log(`*   Keyword ID: ${keywordID}`);
console.log(`*   Search Keyword: ${process.env["KEYWORD"]}`);
console.log(`*   Proxy URL: ${proxyUrl}`);
console.log("******************************************");

let pages = 2;

puppeteer.use(StealthPlugin());

async function crawl(browser) {
    const page = await browser.newPage();

    console.log("Agent loading Google homepage");

    await page.authenticate({ username, password });
    await page.goto("https://www.google.com/?hl=en", { timeout: 9000 });

    try {
        const [agreeButton] = await page.$x("//button/div[text() = 'I agree']");
        if (agreeButton) {
            await agreeButton.click();
        }
    } catch (e) {}

    const inputHandle = await page.waitForXPath("//input[@name = 'q']");
    await inputHandle.type(process.env["KEYWORD"], { delay: 100 });

    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    console.log("Search results page loaded");

    let rankData = [];

    while (pages) {
        const results = await page.$x("//div[@class = 'g']//a[h3]");
        const links = await page.evaluate(
            (...results) => results.map(link => link.href),
            ...results
        );

        const [next] = await page.$x(
            "//div[@role = 'navigation']//a[descendant::span[contains(text(), 'Next')]]"
        );

        await page.waitFor(1000);
        rankData = rankData.concat(links);

        if (!next) {
            break;
        }

        await next.click();
        await page.waitForNavigation();

        pages--;
    }

    await page.waitFor(1000);
    let blocked = false;

    try {
        const [captcha] = await page.$x("//form[@id = 'captcha-form']");
        if (captcha) {
            console.log("Agent encountered a CAPTCHA");
            blocked = true;
        }
    } catch (e) {}

    axios
        .post(`http://172.17.0.1/api/keywords/${keywordID}/callback/`, {
            proxy_id: proxyID,
            results: rankData,
            blocked: blocked,
            secret_key: secretKey
        })
        .then(() => {
            console.log("Successfully returned ranking data.");
        });

    await browser.close();
}

puppeteer
    .launch({
        headless: false,
        executablePath:
            "./node_modules/puppeteer/.local-chromium/linux-884014/chrome-linux/chrome",
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
