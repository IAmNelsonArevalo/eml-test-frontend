import React from "react";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Head from "next/head";
/** Styles */
import 'styles/globals.css';
/** Interfaces & Types */
import type {AppProps} from 'next/app';
/** Local Modules */
import useConfig from "config";
import useViews from "views";

const App = (props: AppProps) => {
    /** Props */
    const {Component, pageProps} = props;

    /** Config */
    const {useStoreConfig} = useConfig();
    const {store, persist} = useStoreConfig();

    /** Views */
    const {useComponents} = useViews();
    const {Header} = useComponents();

    return (
        <React.Fragment>
            <Head>
                <title>{pageProps.headers.title}</title>
                <meta name="description" content={pageProps.headers.description}/>
                <meta name="og:image" content={pageProps.headers.og_image}/>
                <meta name="og:description" content={pageProps.headers.og_description}/>
                <meta name="og:title" content={pageProps.headers.og_title}/>
                <meta name="keywords" content={pageProps.headers.keywords}/>
                <link rel="icon" href={pageProps.headers.og_image}/>
                <link rel="apple-touch-icon" href={pageProps.headers.og_image}/>
                <link rel="apple-touch-icon-precomposed" href={pageProps.headers.og_image}/>
            </Head>
            <React.Suspense fallback={<p>Loading....!</p>}>
                <Provider store={store}>
                    <PersistGate persistor={persist} loading={<p>Loading....!</p>}>
                        {
                            (
                                typeof window !== "undefined" &&
                                window.location.pathname === "/login" ||
                                typeof window !== "undefined" &&
                                window.location.pathname === "/register" ||
                                typeof window !== "undefined" &&
                                window.location.pathname === "/recuperar-contrasena"
                            ) ? (
                                <Component {...pageProps} />
                            ) : (
                                <Header>
                                    <Component {...pageProps} />
                                </Header>
                            )
                        }
                    </PersistGate>
                </Provider>
            </React.Suspense>
        </React.Fragment>
    );
}

export default App;