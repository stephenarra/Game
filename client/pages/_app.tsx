import "../styles/globals.css";

import { ClientProvider } from "utils/clientContext";
import Layout from "components/Layout";

const App = ({ Component, pageProps }) => {
  return (
    <ClientProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClientProvider>
  );
};

export default App;
