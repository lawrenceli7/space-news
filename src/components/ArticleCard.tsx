/* eslint-disable @next/next/no-img-element */
import { Article } from "@/types/types";
import { Card, Divider, Typography } from "antd";
import React from "react";
import image404 from "../assets/404.png";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Card
      hoverable
      onClick={() => window.open(article.url, "_blank")}
      style={{ maxWidth: "32.9%", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", margin: "2px", padding: "0" }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0", marginBottom: "10px" }}>
        <Typography.Title
          level={4}
          style={{ margin: "0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {article.title}
        </Typography.Title>
        <span
          style={{ flexShrink: 0, whiteSpace: "nowrap" }}>{new Date(article.published_at).toLocaleDateString("en-US", options)}</span>
      </div>
      <img
        src={article.image_url}
        alt={article.title}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = image404.src;
        }}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: "8px 8px 0 0", margin: "0", padding: "0" }}
      />
      <Typography.Title
        level={4}
        style={{ margin: "8px 0", textDecoration: "underline" }}>
        {article.title}
        <Divider />
      </Typography.Title>
      <Typography.Paragraph>{article.summary}</Typography.Paragraph>
    </Card>
  );
};

export default ArticleCard;