
import { createRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import { setBaseUrl } from "../../../lib/api-client-react/src";

import './index.css';

// Configure the AWS API Gateway URL
setBaseUrl(
  "https://0lclgt5d9a.execute-api.ap-southeast-2.amazonaws.com"
);

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
