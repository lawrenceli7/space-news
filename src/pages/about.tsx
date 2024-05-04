import { Typography } from "antd";
import Image from 'next/image';
import styled from "styled-components";
import BU from "../assets/bu.jpg";

const StyledOuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
`;

const StyledInnerDivOne = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
`;

const StyledInnerDivTwo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`;

export default function About() {
    return (
        <StyledOuterDiv>
            <Typography.Title>About</Typography.Title>
            <StyledInnerDivOne>
                <Image
                    src={BU.src}
                    alt="BU"
                    width={90}
                    height={90} />
                <Typography.Paragraph>Hi, I&apos;m Lawrence. I am a junior at Boston University studying Computer Science. <br></br>My main interests lie in the field of web development and software engineering, with a special focus on front-end development.<br></br>
                    I am currently looking for an internship for the summer of 2024. <br></br>If you are interested in collaborating or have any projects you think would be a good fit, feel free to reach out to me!</Typography.Paragraph>
            </StyledInnerDivOne>
            <StyledInnerDivTwo>
                <Typography.Text><a href="mailto:lil5@bu.edu">Email</a></Typography.Text>
                <Typography.Text><a href="https://www.linkedin.com/in/lawrenceli7/"> LinkedIn</a></Typography.Text>
                <Typography.Text><a href="https://www.github.com/lawrenceli7/">Github</a></Typography.Text>
            </StyledInnerDivTwo>
        </StyledOuterDiv>
    );
}