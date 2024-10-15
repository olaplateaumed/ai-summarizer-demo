# AI Summarizer API Demo

This project demonstrates the usage of an AI-powered text summarization API. It provides a simple React-based user interface for submitting text to be summarized and displaying the results.

## Features

- Input field for API key
- Text area for entering the content to be summarized
- Real-time API interaction with error handling
- Markdown rendering of the summarized content

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/summarizer-api-demo.git
cd summarizer-api-demo
```

2. Install the dependencies:

```bash
npm install
```

## Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173` (or another port if 5173 is already in use). Open this URL in your web browser to use the application.

## Usage

1. Enter your API key in the "API Key" field.
2. Type or paste the text you want to summarize into the text area.
3. Click the "Summarize" button to start the summarization process.
4. Wait for the result to appear below the input fields.

## Environment Variables

This project uses environment variables to configure the API endpoint. If you need to change the API URL, you can do so by modifying the `API_BASE_URL` in the `src/api.ts` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).