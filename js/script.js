const topCommandOutput = `top - 16:28:12 up  1:23,  3 users,  load average: 0.00, 0.00, 0.00
Tasks: 123 total,   1 running, 122 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.3 us,  0.2 sy,  0.0 ni, 99.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  8048372 total,  6083924 free,   643944 used,  1310504 buff/cache
KiB Swap:  2097148 total,  2097148 free,        0 used.  7156096 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 1234 user1     20   0  162872   3308   2684 S   0.3  0.0   0:00.05 top
 5678 user2     20   0  234956  12328   8456 S   0.1  0.2   0:00.03 bash
 9101 user3     20   0  500120  45060  12040 S   0.1  0.6   0:01.23 chrome`;

function updateTopCommand() {
    document.getElementById('topCommand').innerText = topCommandOutput;
    // Simulate dynamic content by appending random CPU usage
    setInterval(() => {
        const randomCPU = (Math.random() * 10).toFixed(1);
        const randomMem = (Math.random() * 10).toFixed(1);
        const updatedOutput = topCommandOutput.replace(/0\.3 us/, `${randomCPU} us`).replace(/0\.2 sy/, `${randomMem} sy`);
        document.getElementById('topCommand').innerText = updatedOutput;
    }, 2000);
}

function handleCommand(command) {
    const contentDiv = document.getElementById('content');
    const args = command.trim().split(' ');
    const baseCommand = args[0];

    switch (baseCommand) {
        case 'home':
            window.location.href = 'index.html';
            break;
        case 'about':
            window.location.href = 'about.html';
            break;
        case 'contact':
            window.location.href = 'contact.html';
            break;
        case 'help':
            contentDiv.innerHTML += '\nAvailable commands: <b>home, about, contact, help, weather &lt;city&gt;,theme &lt;name&gt;, clear</b>\n';
            break;
        case 'weather':
            if (args.length < 2) {
                contentDiv.innerHTML += '\nUsage: weather &lt;city&gt;\n';
            } else {
                const city = args.slice(1).join(' ');
                fetchWeather(city);
            }
            break;
        case 'clear':
            contentDiv.innerHTML = '';
            break;
        case 'theme':
            if (args.length < 2) {
                contentDiv.innerHTML += '\nUsage: theme &lt;name&gt;\nAvailable themes: unix, solarized\n';
            } else {
                const theme = args[1];
                changeTheme(theme);
            }
            break;
	default:
            contentDiv.innerHTML += `\nUnknown command: ${command}\nType 'help' for a list of available commands.\n`;
    }
    scrollToBottom();
}
function changeTheme(theme) {
    const themeStylesheet = document.getElementById('themeStylesheet');
    switch (theme) {
        case 'unix':
            themeStylesheet.href = 'css/styles.css.unix';
            break;
        case 'solarized':
            themeStylesheet.href = 'css/styles.css.solarized';
            break;
        default:
            document.getElementById('content').innerHTML += `\nUnknown theme: ${theme}\nAvailable themes: unix, solarized\n`;
            return;
    }
    document.getElementById('content').innerHTML += `\nTheme changed to ${theme}\n`;
}
function fetchWeather(city) {
    const apiKey = '6727752e6094f5ee087c9f307a7b5748';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById('content').innerHTML += `\nError fetching weather data: ${data.message}\n`;
                return;
            }

            const weather = data.weather[0].description;
            const temp = data.main.temp;
            const feels_like = data.main.feels_like;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;

            const maxLength = Math.max(
                `Weather: ${weather}`.length,
                `Temperature: ${temp} °C`.length,
                `Feels like: ${feels_like} °C`.length,
                `Humidity: ${humidity}%`.length,
                `Wind speed: ${wind} m/s`.length
            );

            const padString = (str) => str.padEnd(maxLength + 1);

            const weatherInfo = `
+${'-'.repeat(maxLength + 2)}+
| ${padString(`Weather for ${city}`)}|
+${'-'.repeat(maxLength + 2)}+
| ${padString(`Weather: ${weather}`)}|
| ${padString(`Temperature: ${temp} °C`)}|
| ${padString(`Feels like: ${feels_like} °C`)}|
| ${padString(`Humidity: ${humidity}%`)}|
| ${padString(`Wind speed: ${wind} m/s`)}|
+${'-'.repeat(maxLength + 2)}+
`;

            document.getElementById('content').innerHTML += `\n${weatherInfo}\n`;
        })
        .catch(error => {
            document.getElementById('content').innerHTML += `\nError fetching weather data: ${error}\n`;
        });
}

function scrollToBottom() {
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('topCommand')) {
        updateTopCommand();
    }

    const input = document.getElementById('input');
    input.focus();

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = input.innerText.trim();
            if (command !== '') {
                document.getElementById('content').innerHTML += `\nuser@cognitive.ro:~$ ${command}\n`;
                handleCommand(command);
            }
            input.innerText = '';
            scrollToBottom();
        } else if (event.ctrlKey && event.key === 'l') {
            event.preventDefault();
            document.getElementById('content').innerHTML = '';
            input.innerText = '';
        }
    });
});
