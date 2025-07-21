import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App.jsx";
import theme from "./theme.js";
import "./index.css";
import GlobalError from "./components/GlobalError/GlobalError.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <GlobalError resetErrorBoundary={resetErrorBoundary} />
        )}
        onReset={() => {}}
        onError={(e) => console.log("Error:", e?.message)}
      >
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </BrowserRouter>
);
