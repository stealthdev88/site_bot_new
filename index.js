const fs = require("fs/promises");
const { faker } = require("@faker-js/faker");
const pt = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
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
const Connect_ID = "C07U0BMS1FW";

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
    ],
    Canada: [
      { firstName: 'Lars', lastName: 'Lyle' },
      { firstName: 'Finn', lastName: 'Thatcher' },
      { firstName: 'Roman', lastName: 'Irvin' },
      { firstName: 'Roman', lastName: 'Robertson' },
      { firstName: 'Roman', lastName: 'Davis' },
      { firstName: 'Roman', lastName: 'Bailey' },
      { firstName: 'Roman', lastName: 'Boyd' },
      { firstName: 'Roman', lastName: 'Ward' },
      { firstName: 'Roman', lastName: 'Nelson' },
      { firstName: 'Roman', lastName: 'White' }
    ],
  
    Netherland: [
      { firstName: 'Lars', lastName: 'Jansen' },
      { firstName: 'Finn', lastName: 'Bakker' },
      { firstName: 'Daan', lastName: 'Visser' },
      { firstName: 'Milan', lastName: 'Smit' },
      { firstName: 'Ruben', lastName: 'de Boer' },
      { firstName: 'Jesse', lastName: 'Kok' },
      { firstName: 'Niels', lastName: 'Meijer' },
      { firstName: 'Sven', lastName: 'Vries' },
      { firstName: 'Timo', lastName: 'Dijk' },
      { firstName: 'Koen', lastName: 'Mulder' },
      { firstName: 'Bram', lastName: 'Groot' },
      { firstName: 'Thijs', lastName: 'Bos' },
      { firstName: 'Sem', lastName: 'Vos' },
      { firstName: 'Luuk', lastName: 'Peters' },
      { firstName: 'Jasper', lastName: 'Hendriks' },
      { firstName: 'Stijn', lastName: 'Leeuwen' },
      { firstName: 'Wout', lastName: 'Bruin' },
      { firstName: 'Hugo', lastName: 'Berg' },
      { firstName: 'Tijn', lastName: 'Jong' },
      { firstName: 'Rik', lastName: 'Schouten' }
    ],
    Mexico: [
      { firstName: 'Fernando', lastName: 'Moreno' },
      { firstName: 'Rodrigo', lastName: 'Castro' },
      { firstName: 'Castro', lastName: 'Visser' },
      { firstName: 'Emmanuel', lastName: 'Morales' },
      { firstName: 'Rodrigo', lastName: 'Torres' },
      { firstName: 'David', lastName: 'Luna' },
      { firstName: 'Santiago', lastName: 'SanGue' },
      { firstName: 'Rafael', lastName: 'Aguilar' },
      { firstName: 'Alfredo', lastName: 'Rivera' },
      { firstName: 'Luis', lastName: 'Romero' },
      { firstName: 'Jonathan', lastName: 'Rojas' },
      { firstName: 'Alejandro', lastName: 'Torres' },
      { firstName: 'Rodrigo', lastName: 'Infante' },
      { firstName: 'Fernando', lastName: 'Flores' },
      { firstName: 'Pedro', lastName: 'Garza' },
      { firstName: 'Javier', lastName: 'Reyes' },
      { firstName: 'Pedro', lastName: 'Reyes' },
      { firstName: 'Francisco', lastName: 'SanGue' },
      { firstName: 'Christophe', lastName: 'Garza' },
      { firstName: 'Enrique', lastName: 'Cortez' },
      { firstName: 'Alfredo', lastName: 'Castro' },
      { firstName: 'Enrique', lastName: 'Cortez' },
      { firstName: 'Carlos', lastName: 'SanGue' },
      { firstName: 'Christophe', lastName: 'Infante' },
      { firstName: 'Ricardo', lastName: 'Garza' },
      { firstName: 'Jonathan', lastName: 'Guerrero' },
      { firstName: 'Jorge', lastName: 'Contreras' },
      { firstName: 'Francisco', lastName: 'Soto' },
      { firstName: 'Fernando', lastName: 'Rojas' }
    ]
  
};

const COUNTRY = "Mexico";
count = 0;
const formatDateTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

const signup = async (page, emailAddress) => {
  try {
    updateStatus("Close Cookie consent");
    await page.waitForSelector(
      'div#onetrust-close-btn-container button[aria-label="Close"]');
    await page.$eval(
      'div#onetrust-close-btn-container button[aria-label="Close"]',
      (el) => el.click()
    );
    updateStatus("Cookie consent popup closed");
    await delay(500);

    updateStatus("Select freelancer");
    await page.screenshot({ path: "state2.png" }); // Add screenshot here
    await page.waitForSelector('[data-qa="work"]', { timeout: 10000 });
    await page.$eval('[data-qa="work"]', (el) => el.click());
    await delay(500);

    await page.$eval(`button[type="button"][data-qa="btn-apply"]`, (el) =>
      el.click()
    );
    await delay(500);

    const randomIndex = Math.floor(Math.random() * nameArray["Poland"].length);
    const { firstName, lastName } = nameArray["Poland"][randomIndex];
    updateStatus(firstName);
    updateStatus("Input name & emailAddress");
    await page.waitForSelector("#first-name-input", { timeout: 10000 });

    await page.type("#first-name-input", nameArray[COUNTRY][randomNameNumber()]['firstName']);
    await delay(500);
    await page.type("#last-name-input", nameArray[COUNTRY][randomNameNumber()]['lastName']);
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
    let maxRetries = 14;
    let verificationFailed = false;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      updateStatus(`Attempt ${attempt} of ${maxRetries}`);

      const buttonExists = await page.$("#button-submit-form") !== null;
      if (!buttonExists) {
        updateStatus("Button not found, Checking Sing up");
        break;
      }

      await page.$eval("#button-submit-form", (el) => el.click());
      await delay(2000);

      let pageContent = await page.content();
      verificationFailed = pageContent.includes("Verification failed. Please try again.");

      isSignup = pageContent.includes("Congratulations, your account has been created. Let's get you started!");

      if (isSignup) {
        break;
      }

      if (verificationFailed) {
        updateStatus("Verification failed alert detected. Retrying submission...");
      }
      await delay(2000);
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

    let pageContent = await page.content();
    serverError = pageContent.includes("This almost never happens, but something went wrong.");
    if (serverError) {
      throw new Error("Sign UP Failed due to server error");
    }

    updateStatus("URL changed to the verification page.");
    updateStatus(`Sign UP success! Check connect.  ${emailAddress} \n`);
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
        "https://www.upwork.com/jobs/~021840474880157407475",{
          waitUntil: "domcontentloaded",
        })
    );
    await page.waitForSelector('[data-test="ConnectsMobile"] .flex-sm-1', { timeout: 30000 });

    // Evaluate the page content to check for the specific string
    const hasConnect = await page.evaluate(() => {
      const element = document.querySelector('[data-test="ConnectsMobile"] .flex-sm-1');
      return element && element.textContent.includes('10 available');
    });
    await delay(500);
    
    const suspended = await page.evaluate(() => {
      const elements = document.querySelectorAll("div.air3-alert-content");
      return Array.from(elements)
        .map((el) => el.textContent)
        .join(" ");
    });

    if (hasConnect && 
      (!suspended.includes("You are unable to complete ID Verification due to a suspension on your account."
    ))) {
      const date = formatDateTime();
      return true;
    }
    return false;
  } catch (error) {
    updateStatus(`Error in checkConnect: ${error.message}`);
    throw error;
  }
};

const randomNumber = () => Math.floor(Math.random() * 10000000);
const randomNameNumber = () => Math.floor(Math.random() * 28);

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
    const proxies = await fs.readFile("proxy.txt", 'utf-8');
    const proxyList = proxies
      .split('\n')
      .map(proxy => proxy.trim())
      .filter(proxy => proxy !== '')
      .map(proxy => {
        const [server, username, password] = proxy.split(',');
        return { server, username, password };
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
  const startTime = Date.now();

  while (true) {

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
      ],
    });

    try {
      const start = performance.now();
      const [page] = await browser.pages();

      await page.setViewport({ width: 800, height:600, deviceScaleFactor: 1,isLandscape: false});
      const userAgent = new UserAgent();
      await page.setUserAgent(userAgent.toString());
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
      });

      const emailAddress = `${faker.person.firstName(
        "male"
      )}${faker.person.lastName()}${randomNumber()}@gmail.com`;
      updateStatus(`${formatDateTime()} ${emailAddress}`);
      updateStatus("Preparing upwork signup page...");
      await retry(() =>
        page.goto("https://www.upwork.com/nx/signup/?dest=home", {
          waitUntil: "domcontentloaded",
        })
      );
      await delay(5000);
      const status = await CheckHumanVerificationPresent(page);

      await signup(page, emailAddress);
      const hasConnect = await checkConnect(page, emailAddress, PASSWORD);
      if(hasConnect){
        sendSlackMessage(`${emailAddress}    =>  ${PASSWORD}`,Connect_ID);
      } else {
        sendSlackMessage(`${emailAddress}`,Zero_ID);
      }

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
