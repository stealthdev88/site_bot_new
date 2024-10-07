const fs = require("fs/promises");
const { faker } = require("@faker-js/faker");
const pt = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
const { randomInt } = require("crypto");
const { WebClient } = require("@slack/web-api");
const readline = require('readline');
// const chalk = require("chalk");
let chalk;

(async () => {
  chalk = (await import("chalk")).default;
})();

pt.use(StealthPlugin());

// const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
// pt.use(
//   AdblockerPlugin({
//     interceptResolutionPriority: 0,
//   })
// );

const PASSWORD = "kimju1992103";

const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN || "";
const SLACK_CHANNEL_ID = "C07NTMV7L84";
const USERNAME = "upwork_bot";

const web = new WebClient(SLACK_APP_TOKEN);

/**
 * Function for sending notification to the slack channel
 * @param {string} message
 */

async function sendSlackMessage(message) {
  try {
    // Post a message to the channel
    await web.chat.postMessage({
      channel: SLACK_CHANNEL_ID,
      text: message,
      username: USERNAME
    });
  } catch (error) {
    console.log("send message error!");
  }
}

const getRandomName = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const names = data.split("\n").map((name) => name.trim()).filter((name) => name);
    return names.length ? names[randomInt(names.length)] : null;
  } catch (err) {
    console.error("Error reading the file:", err);
    return null;
  }
};

const nameArray = {
  Poland:[
	  { firstName: 'Philip', lastName: 'Kowalski' },
    { firstName: 'Taylor', lastName: 'Nowak' },
    { firstName: 'Bill', lastName: 'Wojcik' },
    { firstName: 'Rex', lastName: 'Kaminski' },
    { firstName: 'Emil', lastName: 'Zielinski' },
    { firstName: 'Bob', lastName: 'Kaczmarek' },
    { firstName: 'Oliver', lastName: 'Piotrowski' },
    { firstName: 'Randy', lastName: 'Laskowski' },
    { firstName: 'Eric', lastName: 'Gorski' },
    { firstName: 'Nick', lastName: 'Wrobel' },
    { firstName: 'Jerry', lastName: 'Pawlak' },
    { firstName: 'Victor', lastName: 'Wolski' },
    { firstName: 'Alex', lastName: 'Sikora' },
    { firstName: 'Richard', lastName: 'Baran' },
    { firstName: 'Jon', lastName: 'Szewczyk' },
    { firstName: 'Michal', lastName: 'Krawczyk' },
    { firstName: 'Jaime', lastName: 'Dudek' },
    { firstName: 'Thomas', lastName: 'Zalewski' },
    { firstName: 'Mario', lastName: 'Nowicki' },
    { firstName: 'Toby', lastName: 'Czerwinski' },
    { firstName: 'Mike', lastName: 'Jankowski' },
    { firstName: 'Andre', lastName: 'Szymczak' },
    { firstName: 'Tommy', lastName: 'Ostrowski' },
    { firstName: 'Jake', lastName: 'Chmielewski' },
    { firstName: 'David', lastName: 'Urbanski' },
    { firstName: 'Sammy', lastName: 'Borkowski' },
    { firstName: 'Nelson', lastName: 'Sadowski' },
    { firstName: 'Sam', lastName: 'Mazurek' },
    { firstName: 'Kevin', lastName: 'Kubiak' },
    { firstName: 'Tom', lastName: 'Brzozowski' }
    ]
};

const COUNTRY = "Canada";
count = 0;
const formatDateTime = () => {
  const now = new Date();

  // Define options for EST/EDT
  const options = {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const [
    { value: month },,
    { value: day },,
    { value: year },,
    { value: hour },,
    { value: minute },,
    { value: second }
  ] = formatter.formatToParts(now);

  const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return formattedDateTime;
};



function updateStatus(message) {
  if (process.stdout.isTTY) {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(message);
  } else {
    console.log("\n"+message);
  }
}

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const cnd = "U077FFVA88M";

var firstName = "";
var lastName = "";

const signup = async (page, emailAddress) => {
  try {
    // Close the cookie consent popup if it appears
    updateStatus("Close Cookie consent");
    await page.waitForSelector(
      'div#onetrust-close-btn-container button[aria-label="Close"]');
    await page.$eval(
      'div#onetrust-close-btn-container button[aria-label="Close"]',
      (el) => el.click()
    );
    updateStatus("Cookie consent popup closed");
    await delay(500);

    // Click on 'Work' button
    updateStatus("Select freelancer");
    await page.screenshot({ path: "state2.png" }); // Add screenshot here
    await page.waitForSelector('[data-qa="work"]', { timeout: 10000 });
    await page.$eval('[data-qa="work"]', (el) => el.click());
    await delay(500);

    await page.$eval(`button[type="button"][data-qa="btn-apply"]`, (el) =>
      el.click()
    );
    await delay(500);

   // const randomIndex = Math.floor(Math.random() * nameArray["Poland"].length);
   // const { firstName, lastName } = nameArray["Poland"][randomIndex];
   // updateStatus(firstName);
    updateStatus("Input name & emailAddress");
    await page.waitForSelector("#first-name-input", { timeout: 10000 });
    await page.type("#first-name-input", firstName);
    await delay(500);
    await page.type("#last-name-input", lastName);
    await delay(500);
    await page.type("#redesigned-input-email", emailAddress);
    await delay(500);
    await page.type("#password-input", PASSWORD);
    await delay(500);

    // Wait for the country dropdown to appear and select country
    updateStatus("Select country-name...");
    await page.waitForSelector('[aria-labelledby*="select-a-country"]', {
      timeout: 10000,
    });
    await delay(500);
    await page.waitForSelector("#checkbox-terms", { timeout: 10000 });
    await page.$eval("#checkbox-terms", (el) => el.click());
    await delay(1000);
    await page.waitForSelector("#button-submit-form", { timeout: 10000 });
    let maxRetries = 7;
    let verificationFailed = false;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      updateStatus(`Attempt ${attempt} of ${maxRetries}`);

      const buttonExists = await page.$("#button-submit-form") !== null;
      if (!buttonExists) {
        updateStatus("Button not found, Checking Sing up");
        break;
      }

      await page.$eval("#button-submit-form", (el) => el.click());
      await delay(3000);

      let pageContent = await page.content();
      verificationFailed = pageContent.includes("Verification failed. Please try again.");

      serverError = pageContent.includes("This almost never happens, but something went wrong.");
      

      if (serverError) {
        throw new Error("Sign UP Failed due to server error");
      }

      isSignup = pageContent.includes("Congratulations, your account has been created. Let's get you started!");

      if (isSignup) {
        break;
      }

      if (verificationFailed) {
        updateStatus("Verification failed alert detected. Retrying submission...");
      }
      await delay(3000);
    }

    updateStatus("Checking Sign up...");

    try {
      await page.waitForFunction(
        () => document.body.innerText.includes("Congratulations, your account has been created. Let's get you started!"),
        { timeout: 30000 }
      );
    } catch (error) {
      throw new Error("Sign UP Failed");
    }

    updateStatus("URL changed to the verification page.");
    updateStatus('Sign UP success! Check connect.');
  } catch (error) {
    updateStatus(`Error in signup: ${error.message}`);
    throw error;
  }
};

const checkConnect = async (page, emailAddress, PASSWORD) => {
  try {
    await delay(5000);
    await retry(() =>
      page.goto(
        "https://www.upwork.com/jobs/Senior-Python-Developer_~021835489939882789597",{
          waitUntil: "domcontentloaded",
        })
    );
    await page.waitForSelector('[data-test="ConnectsMobile"] .flex-sm-1', { timeout: 30000 });
	await page.screenshot({path: "check.png"});
    // Evaluate the page content to check for the specific string
    const hasConnect = await page.evaluate(() => {
      const element = document.querySelector('[data-test="ConnectsMobile"] .flex-sm-1');
      return element ? element.textContent.trim() : null;
    });

    await delay(500);
    
    const suspended = await page.evaluate(() => {
      const elements = document.querySelectorAll("div.air3-alert-content");
      return Array.from(elements)
        .map((el) => el.textContent)
        .join(" ");
    });

    if (hasConnect.includes('10 available') && 
      (!suspended.includes("You are unable to complete ID Verification due to a suspension on your account."
    ))) {
      const date = formatDateTime();
      const logEntry = `${date} ${emailAddress} P: ${PASSWORD}\n`;
      sendSlackMessage (`${logEntry}`);
      return true;
    }
    return false;
  } catch (error) {
    updateStatus(`Error in checkConnect: ${error.message}`);
    throw error;
  }
};

const readMail = async (emailAddress) => {
  updateStatus("Email not found. Retrying...");
  try {
    // Post a message to the channel
    await web.chat.postMessage({
      channel: cnd,
      text: emailAddress,
    });
  } catch (error) {
    console.log("send message error!");
  }
  await delay(500);
};

const randomNumber = () => Math.floor(Math.random() * 10000000);

async function CheckHumanVerificationPresent(page) {
  try {
      let isPresent = false;
      const startTime = Date.now();
      await page.screenshot({ path: "signup.png" });
      while (!isPresent) {
        if(Date.now() - startTime > 30 * 1000)
          break;
        
        let pageContent = await page.content();
        isPresent = pageContent.includes("Join as a client or freelancer");

        if (!isPresent) {
          updateStatus("Findind & avoid Verify you are human");
          const currentTime = Date.now();
          const interval = 20;
          const startX = 10;
          const startY = 220;
          const endX = 100;
          const endY = 380;

          for (let y = startY; y <= endY; y += interval) {
            for (let x = startX; x <= endX; x += interval) {
              updateStatus(`Clicking at: (${x}, ${y})`);
              await page.mouse.click(x, y);
              await delay(10);
            }
          }

          await delay(1500); // Wait for 1 second (adjust as needed)
          updateStatus("click");
        }
      }

      updateStatus("Verification text has disappeared.");
      return isPresent;
  } catch (error) {
      console.error(`Error checking human verification for `, error);
      return false;
  }
}

const getProxy = async () => {
  try {
    const proxies = await fs.readFile("a2.txt", 'utf-8');
    const proxyList = proxies
      .split('\n')
      .map(proxy => proxy.trim())
      .filter(proxy => proxy !== '')
      .map(proxy => {
        const [server, port, username, password] = proxy.split(':');
        return { server, port, username, password };
      });

    if (proxyList.length === 0) {
      throw new Error('proxy list is empty');
    }
    return proxyList;
  } catch (error) {
    throw new Error(`Error reading username file: ${error.message}`);
  }
}

let browser;
const startScript = async () => {
  const proxies = await getProxy();
  let proxyIndex = 0;
  const startTime = Date.now();

  while (true) {

    const { server, port, username, password } = proxies[proxyIndex];
    proxyIndex = (proxyIndex + 1) % proxies.length;
    let proxi_server = server + ":" + port;
    browser = await pt.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--start-maximized",
        "--window-size=800x600",
        "--disable-infobars",
        "--disable-features=site-per-process",
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
        '--disable-site-isolation-trials',
        '--window-position=50,2000',
        "--disable-blink-features=AutomationControlled",
        `--proxy-server=${proxi_server}`,
      ],
    });

    try {
      const start = performance.now();
      const [page] = await browser.pages();

      await page.authenticate({
        username: username,
        password: password,
      });
      await page.setViewport({ width: 800, height:600, deviceScaleFactor: 1,isLandscape: false});
      const userAgent = new UserAgent();
      await page.setUserAgent(userAgent.toString());
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
      });

      // await page.evaluateOnNewDocument(() => {
      //   Object.defineProperty(navigator, "webdriver", {
      //     get: () => false,
      //   });
      // });
      firstName = await getRandomName("./firstName.txt");
      lastName = await getRandomName("./lastName.txt");

      const emailAddress = `${firstName}.${lastName}${randomNumber()}@outlook.com`;
      updateStatus(`${formatDateTime()} ${emailAddress}`);
      updateStatus("Preparing upwork signup page...");
      await retry(() =>
        page.goto("https://www.upwork.com/nx/signup/?dest=home", {
          waitUntil: "domcontentloaded",
        })
      );
      // await delay(10000);
      const status = await CheckHumanVerificationPresent(page);

      await signup(page, emailAddress);
      console.log(`${server} \n`)
      const hasConnect = await checkConnect(page, emailAddress, PASSWORD);

      updateStatus(
        `${formatDateTime()} ${emailAddress} => ${
          (performance.now() - start) / 1000
        }s : ${
          hasConnect ? chalk.bgGreen(hasConnect) : chalk.bgRed(hasConnect)
        } \n`
      );
    } catch (error) {
      updateStatus(`Error occurred: ${error.message}\n`);
    } finally {
      if (browser) {
        const delay_time = 10000 + Math.random() * 5000;
        await delay(delay_time);
        await browser.close();
      }
    }
  }
};

const retry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      updateStatus(`Retry ${i + 1} failed: ${error.message}`);
      if (i === retries - 1) throw error;
      await delay(5000);
    }
  }
};

// Handle termination signals to close the browser
const handleExit = async (signal) => {
  updateStatus(`Received ${signal}. Closing browser...`);
  if (browser) {
    await browser.close();
  }
  process.exit(0);
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);

startScript();
