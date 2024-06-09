# Terminal-Like Web Application

This project is a terminal-like web application with a dynamic top command, a command prompt that accepts various commands (such as `about`, `contact`, `help`, `weather <city>`, and `clear`), and a theme switcher between solarized and UNIX styles.
## Features

- Terminal-like interface with a dynamic top command.
- Command prompt that accepts:
  - `home` - Navigate to the home page.
  - `about` - Navigate to the about page.
  - `contact` - Navigate to the contact page.
  - `help` - Display a list of available commands.
  - `weather <city>` - Fetch and display weather information for the specified city.
  - `clear` - Clear the terminal output.
  - `theme <unix|solarized>` - Change the theme of the terminal.
- Links to Home, About, and Contact pages.
- Theme switcher between solarized and UNIX styles.

## Prerequisites

- Python 3.x installed on your system.

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/valeriu-craciun/website-terminal-project.git
   cd <repository>
Running the Application Locally

    Start a local server using Python:
    python3 -m http.server 8080
Open your web browser and navigate to http://localhost:8080.
Customization
Changing Themes

To dynamically change the theme, use the command prompt:
theme unix
theme solarized
Fetching Weather Information

To fetch and display weather information, use the command prompt:
weather <city>
License

This project is licensed under the MIT License - see the LICENSE file for details.
Contact

For any inquiries, please contact:

    Email: valeriu.craciun@cognitive.ro

