import { Card, Divider, Typography } from "antd";
import axios from "axios";
import Image from 'next/image';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import image404 from "../assets/404.png";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCard = styled(Card)`
  max-width: 45%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: 2px;
  padding: 0;
`;

const StyledTitle = styled(Typography.Title)`
  margin: 8px 0;
  text-decoration: underline;
`;

const StyledImage = styled.img`
  max-width: 100%;
`;

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

  function getImage(url: string) {
    if (url) {
      return <StyledImage src={latestArticle.image_url} alt="none" />;
    } else {
      return <Image src={image404.src} alt="error-image" />;
    }
  }

  return (
    <div>
      {loading ? (
        <p></p>
      ) : latestArticle ? (
        <div>
          <StyledDiv>
            <Typography.Title level={2}>Latest Article</Typography.Title>
            <Divider type="vertical" />
            <Link href="/news">
              <span>See all articles</span>
            </Link>
          </StyledDiv>
          <StyledCard
            hoverable
            onClick={() => window.open(latestArticle.url, "_blank")}
            title={latestArticle.title}
            cover={getImage(latestArticle.image_url)}
            extra={new Date(latestArticle.published_at).toLocaleDateString("en-US", options)}>
            <StyledTitle
              level={4}>
              {latestArticle.title}
              <Divider />
            </StyledTitle>
            <Typography.Paragraph>{latestArticle.summary}</Typography.Paragraph>
          </StyledCard>
        </div>
      ) : (
        <Typography.Text>No latest article found.</Typography.Text>
      )}
    </div>
  );
};

export default LatestArticleSection;
