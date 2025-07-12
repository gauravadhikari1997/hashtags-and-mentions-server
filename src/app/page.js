"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <h1 className={styles.heading}>Free Hashtags and Mentions Server</h1>
        <p className={styles.paragraph}>
          A simple backend for hashtags and mentions, with MongoDB and REST API.
        </p>
        <p className={styles.paragraph}>
          <strong>Base URL:</strong>
          <code className={styles.code}>{baseUrl}</code>
        </p>
        <p className={styles.paragraph}>
          API endpoints are available under:{" "}
          <code className={styles.code}>/api/</code>
        </p>
        <p className={styles.paragraph}>
          Enjoying? Read my other blogs at{" "}
          <a
            className={styles.link}
            href="https://gauravadhikari.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blogs
          </a>
          .
        </p>
      </section>
      <div className={styles.footer}>
        <p>
          <a
            className={styles.footerLink}
            href="https://gauravadhikari.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gaurav Adhikari
          </a>
        </p>
      </div>
    </div>
  );
}
