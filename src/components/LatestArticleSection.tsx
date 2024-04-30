import { Card, Divider, Typography } from "antd";
import axios from "axios";
import Image from 'next/image';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import image404 from "../assets/404.png";

const LatestArticleSection: React.FC = () => {
  const [latestArticle, setLatestArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestArticle = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.spaceflightnewsapi.net/v4/articles?_limit=1&_sort=publishedDate:DESC"
      );

      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setLatestArticle(response.data.length > 0 ? response.data[0] : null);
      } else if (Array.isArray(response.data.results)) {
        setLatestArticle(response.data.results.length > 0 ? response.data.results[0] : null);
      } else {
        console.error("API response does not contain a valid article array.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchLatestArticle();
  }, [fetchLatestArticle]);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography.Title level={2}>Latest Article</Typography.Title>
        <Divider type="vertical" />
        <Link href="/news">
          <span>See all articles</span>
        </Link>
      </div>
      <Card
        hoverable
        onClick={() => window.open(latestArticle.url, "_blank")}
        style={{ maxWidth: "45%", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", margin: "2px", padding: "0" }}>
        {loading ? (
          <p>Loading latest article...</p>
        ) : latestArticle ? (
          <div>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0", marginBottom: "10px" }}>
              <Typography.Title
                level={4}
                style={{ margin: "0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {latestArticle.title}
              </Typography.Title>
              <span style={{ flexShrink: 0, whiteSpace: "nowrap" }}>{new Date(latestArticle.published_at).toLocaleDateString("en-US", options)}</span>
            </div>
            <Image
              src={latestArticle.image_url}
              alt={latestArticle.title}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = image404.src; }}
              layout="responsive"
              width={500}
              height={300}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: "8px 8px 0 0", margin: "0", padding: "0" }}
            />
            <Typography.Title
              level={4}
              style={{ margin: "8px 0", textDecoration: "underline" }}>{latestArticle.title}</Typography.Title>
            <Divider />
            <Typography.Paragraph>{latestArticle.summary}</Typography.Paragraph>
          </div>
        ) : (
          <Typography.Text>No latest article found.</Typography.Text>
        )}
      </Card>
    </div>
  );
};

export default LatestArticleSection;
