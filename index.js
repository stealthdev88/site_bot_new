const { faker } = require("@faker-js/faker");
const pt = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
const chalk = require("chalk");

pt.use(StealthPlugin());
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
pt.use(
  AdblockerPlugin({
    interceptResolutionPriority: 0,
  })
);

const { WebClient } = require("@slack/web-api");

// Your Slack bot token
const token = "";
const channel1 = "C07NTMV7L84";
const slackClient = new WebClient(token);

const country = [
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "British Virgin Islands",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, the Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern and Antarctic Lands",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territories",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Rwanda",
  "Saint Barthelemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerlandselected",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "United States Virgin Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
let COUNTRY = "";

const nameArray = {
  Poland: [
    { firstName: 'David', lastName: 'Lyle' },
    { firstName: 'Benjamin', lastName: 'Thatcher' },
    { firstName: 'Avery', lastName: 'Irvin' },
    { firstName: 'Logan', lastName: 'Robertson' },
    { firstName: 'Leo', lastName: 'Davis' },
    { firstName: 'Jayce', lastName: 'Bailey' },
    { firstName: 'Huxley', lastName: 'Boyd' },
    { firstName: 'William', lastName: 'Ward' },
    { firstName: 'Aarav', lastName: 'Nelson' },
    { firstName: 'River', lastName: 'White' }
  ],
  Canada: [
    { firstName: 'David', lastName: 'Lyle' },
    { firstName: 'Benjamin', lastName: 'Thatcher' },
    { firstName: 'Avery', lastName: 'Irvin' },
    { firstName: 'Logan', lastName: 'Robertson' },
    { firstName: 'Leo', lastName: 'Davis' },
    { firstName: 'Jayce', lastName: 'Bailey' },
    { firstName: 'Huxley', lastName: 'Boyd' },
    { firstName: 'William', lastName: 'Ward' },
    { firstName: 'Jaxson', lastName: 'Lewis' },
    { firstName: 'River', lastName: 'White' },
    { firstName: 'Andrew', lastName: 'Meyer' },
    { firstName: 'Colton', lastName: 'Park' },
    { firstName: 'Odin', lastName: 'Ward' },
    { firstName: 'Seth', lastName: 'Menton' },
    { firstName: 'Zayden', lastName: 'Carlson' },
    { firstName: 'Charles', lastName: 'Till' },
    { firstName: 'Sebastian', lastName: 'Thomas' },
    { firstName: 'Max', lastName: 'Perrin' },
    { firstName: 'Rowan', lastName: 'Tyrell' },
    { firstName: 'Brooks', lastName: 'Roberts' },
    { firstName: 'Arjun', lastName: 'Glen' },
    { firstName: 'Damian', lastName: 'Beckman' },
    { firstName: 'Declan', lastName: 'Baldwin' },
    { firstName: 'Cayden', lastName: 'Rose' },
    { firstName: 'Ivan', lastName: 'Mayer' },
    { firstName: 'Jasper', lastName: 'Meyer' },
    { firstName: 'Adam', lastName: 'Fisher' },
    { firstName: 'Dominic', lastName: 'Grant' },
    { firstName: 'Ryan', lastName: 'Todd' },
    { firstName: 'Rory', lastName: 'Tillsley' },
    { firstName: 'Vincent', lastName: 'Johnson' },
    { firstName: 'Zachary', lastName: 'Stewart' },
    { firstName: 'Jayce', lastName: 'Frazer' },
    { firstName: 'Callum', lastName: 'Day' },
    { firstName: 'Cole', lastName: 'Cowan' },
    { firstName: 'Isaac', lastName: 'Brant' },
    { firstName: 'Aaron', lastName: 'Young' },
    { firstName: 'Austin', lastName: 'Bourne' },
    { firstName: 'Brooks', lastName: 'Paull' },
    { firstName: 'Dominic', lastName: 'Scott' },
    { firstName: 'Damian', lastName: 'Harris' },
    { firstName: 'Harvey', lastName: 'Perrin' },
    { firstName: 'Tobias', lastName: 'Brockhouse' },
    { firstName: 'Andre', lastName: 'Nelson' },
    { firstName: 'Walter', lastName: 'Withers' },
    { firstName: 'Odin', lastName: 'Ross' },
    { firstName: 'Carson', lastName: 'Wilkinson' },
    { firstName: 'Carter', lastName: 'Carlson' },
    { firstName: 'Ashton', lastName: 'Mercer' },
    { firstName: 'Mark', lastName: 'Lee' },
    { firstName: 'Mason', lastName: 'Granholm' },
    { firstName: 'Arjun', lastName: 'Symons' },
    { firstName: 'Gunner', lastName: 'Miller' },
    { firstName: 'Kaiden', lastName: 'Lee' },
    { firstName: 'Logan', lastName: 'Davidson' },
    { firstName: 'Malik', lastName: 'Altman' },
    { firstName: 'Kevin', lastName: 'Nevin' },
    { firstName: 'Kingston', lastName: 'Bourne' },
    { firstName: 'Griffin', lastName: 'Marks' },
    { firstName: 'Thomas', lastName: 'Bishop' },
    { firstName: 'Lewis', lastName: 'Beckman' },
    { firstName: 'Cameron', lastName: 'Prince' },
    { firstName: 'Leonardo', lastName: 'Irving' },
    { firstName: 'Maximus', lastName: 'Clifton' },
    { firstName: 'Jayce', lastName: 'Brock' },
    { firstName: 'Aidan', lastName: 'Staples' },
    { firstName: 'Ashton', lastName: 'Thomson' },
    { firstName: 'Arthur', lastName: 'Hennessy' },
    { firstName: 'Jordan', lastName: 'Brook' },
    { firstName: 'Cohen', lastName: 'Mitchell' },
    { firstName: 'Jaxon', lastName: 'Barry' },
    { firstName: 'Colton', lastName: 'Till' },
    { firstName: 'Kyle', lastName: 'Foster' }
  ]
};

const nameCountry = "Canada";

const PASSWORD = "kimju1992103";

const getCurrentDateTime = () => {
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
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    { value: second },
  ] = formatter.formatToParts(now);
  const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return formattedDateTime;
};
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

function updateStatus(newStatus) {
  process.stdout.clearLine(); // Clear the current line
  process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
  process.stdout.write(newStatus);
}
const randomNumber = () => Math.floor(Math.random() * 100000);
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
const humanLikeType = async (page, input, text) => {
  for (let i = 0; i < text.length; i++) {
    // Simulate a typo with a small probability
    if (Math.random() < 0.2) {
      // 10% chance of a typo
      const typoChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random lowercase letter
      await page.type(input, typoChar);
      await delay(Math.random() * 150 + 50);
      await page.keyboard.press("Backspace"); // Correct the typo
    }
    // Type the correct character
    await page.type(input, text[i]);
    await delay(Math.random() * 150 + 50);
  }
};
const signup = async (page, emailAddress, firstName, lastName) => {
  try {
    // Close the cookie consent popup if it appears
    try {
      await page.waitForSelector(
        'div#onetrust-close-btn-container button[aria-label="Close"]'
      );
      await page.$eval(
        'div#onetrust-close-btn-container button[aria-label="Close"]',
        (el) => el.click()
      );
      updateStatus("===> 15% Cookie consent popup closed");
    } catch (error) {
      updateStatus("Cookie consent popup not found, proceeding...");
    }
    // Click on 'Work' button
    updateStatus("====> 20% Navigating to Signup page...");
    await page.waitForSelector('[data-qa="work"]', {
      timeout: 400000,
    });
    await page.$eval('[data-qa="work"]', (el) => el.click());
    await page.$eval(`button[type="button"][data-qa="btn-apply"]`, (el) =>
      el.click()
    );
    // Fill out the signup form
    updateStatus("=====> 25% Filling the inputs out...");
    await page.waitForSelector("#first-name-input", {
      timeout: 400000,
    });
    await humanLikeType(page, "#first-name-input", firstName);
    await humanLikeType(page, "#last-name-input", lastName);
    await humanLikeType(page, "#redesigned-input-email", emailAddress);
    await humanLikeType(page, "#password-input", PASSWORD);
    // Wait for the country dropdown to appear and select country
    updateStatus("======> 30% Selecting country...");
    await page.waitForSelector('[aria-labelledby*="select-a-country"]', {
      timeout: 100000,
    });
    await delay(1500);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    let transition = country.indexOf("Japan") - country.indexOf(COUNTRY);
    while (true) {
      if (transition > 0) {
        transition--;
        await page.keyboard.press("ArrowUp");
      } else {
        transition++;
        await page.keyboard.press("ArrowDown");
      }
      if (transition == 0) {
        await page.keyboard.press("Enter");
        break;
      }
    }
    await delay(500);
    await page.waitForSelector("#checkbox-terms", {
      timeout: 10000,
    });
    await page.$eval("#checkbox-terms", (el) => el.click());
    await page.waitForSelector("#button-submit-form", {
      timeout: 10000,
    });
    await page.$eval("#button-submit-form", (el) => el.click());
    updateStatus("==============> 70% Verifing email...");
    await delay(10000);
    await page.screenshot({
      path: `1-submit.jpg`,
    });
  } catch (error) {
    updateStatus(`Error in signup: ${error.message}`);
    throw error;
  }
};
const checkConnect = async (page, emailAddress) => {
  updateStatus(
    "==================> 90% Going to job detail page for checking connection..."
  );
  await page.goto("https://www.upwork.com/jobs/Flutter-Front-End-Expert-Needed-Updating-Building-new-pages_~01ece3f88186a82017/?referrer_url_path=/nx/search/jobs/", {
    waitUntil: "domcontentloaded",
  });
  updateStatus("===================> 95% Checking connection...");
  await page.screenshot({
    path: "3-check.jpg",
  });
  await page.waitForSelector("div.text-light-on-muted.mt-5 div.mt-2");
  await delay(2000);
  const connect = await page.$eval(
    "div.text-light-on-muted.mt-5 div.mt-2",
    (el) => el.innerText.trim()
  );

  const isSuspend = await checkSuspend(page);

  if (connect === "Available Connects: 0") {
    return false;
  } else {
    if (isSuspend) {
      return false;
    }
    const date = getCurrentDateTime();
    const logEntry = `${emailAddress}`;
    await slackClient.chat.postMessage({
      channel: channel1,
      text: logEntry,
      username: "upwork_bot"
    });
    return true;
  }
};

const checkSuspend = async (page) => {
  const alertElements = await page.$$("div.container div.air3-alert-content");
  if (alertElements.length > 0) {
    let isSuspend = false;
    for (const alert of alertElements) {
      const textContent = await page.evaluate(
        (element) => element.textContent,
        alert
      );
      if (textContent.toLowerCase().indexOf("suspens") > -1) {
        isSuspend = true;
      }
    }
    return isSuspend;
  } else {
    return true;
  }
};

let browser;
const startScript = async () => {
  while (true) {
    COUNTRY = country[Math.floor(Math.random() * country.length)];
    browser = await pt.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920x1080",
        "--start-maximized",
        "--disable-infobars",
        "--disable-features=site-per-process",
        "--disable-web-security",
        "--disable-blink-features=AutomationControlled",
      ],
    });
    try {
      const signupStart = performance.now();
      const [page] = await browser.pages();
      const userAgent = new UserAgent();
      await page.setUserAgent(userAgent.toString());
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
      });
      await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, "webdriver", {
          get: () => false,
        });
      });

      const randomIndex = Math.floor(Math.random() * nameArray[nameCountry].length);

      const { firstName, lastName } = nameArray[nameCountry][randomIndex];

      const emailAddress =
      faker.person.firstName("male").toLowerCase() + faker.person.lastName("male").toLowerCase() + randomNumber() + "@outlook.com";
      updateStatus(`${formatDateTime()} ${emailAddress}\n`);
      updateStatus("=> 5% Going to Upwork site...");
      await retry(() =>
        page.goto("https://www.upwork.com/nx/signup/?dest=home", {
          waitUntil: "domcontentloaded",
        })
      );
      await signup(page, emailAddress, firstName, lastName);
      await delay(2000);

      await delay(5000);
      const hasConnect = await checkConnect(page, emailAddress);
      // process.stdout.clearLine(); // Clear the current line
      updateStatus(
        `${formatDateTime()} ${emailAddress} => ${
          (performance.now() - signupStart) / 1000
        }s :  ${getCurrentDateTime()} : ${
          // hasConnect ? chalk.bgGreen(hasConnect) : chalk.bgRed(hasConnect)
          hasConnect
        }\n`
      );

      const delay_time = Math.random() * 15000;
      updateStatus(
        `Waiting for next creating account: ${delay_time / 1000}s\n`
      );
      await delay(delay_time);
    } catch (error) {
      if (error.message.includes("Target closed")) {
        console.error("Target closed unexpectedly. Retrying...");
      } else {
        console.error(`Error occurred: ${error.message}`);
      }
    } finally {
      if (browser) {
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
  console.error(`Received ${signal}. Closing browser...`);
  if (browser) {
    await browser.close();
  }
  process.exit(0);
};
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);
startScript();