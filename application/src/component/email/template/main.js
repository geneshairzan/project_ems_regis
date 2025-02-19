// import { Html } from "@react-email/html";
// import { Text } from "@react-email/text";
// import { Section } from "@react-email/section";
// import { Container } from "@react-email/container";
import { Column, Row, Container, Section, Html, Text, Head, Body, Preview } from "@react-email/components";

// https://demo.react.email/preview/stripe-welcome

export default function WelcomeEmail(props) {
  return (
    <Html>
      <Head />
      <Preview>{props.preview || "Email Verification"}</Preview>
      <Body>
        <Column
          style={{
            margin: "0 auto",
            padding: "20px 0 48px",
            width: "580px",
            backgroundColor: "#ffffff",
          }}
        >
          <Text
            style={{
              fontSize: "32px",
              lineHeight: "1.3",
              fontWeight: "700",
              color: "#484848",
            }}
          >
            Hi there!
          </Text>
          <Text
            style={{
              fontSize: "18px",
              lineHeight: "1.4",
              color: "#484848",
            }}
          >
            {props.msg}
          </Text>
          <Text
            style={{
              fontSize: "20px",
              lineHeight: "1.4",
              color: "#484848",
              fontWeight: "bold",
            }}
          >
            {props.code}
          </Text>
        </Column>
      </Body>
    </Html>
  );
}
