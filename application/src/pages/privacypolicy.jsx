import UI from "@gh/ui";
const spanStyle = {
  fontWeight: "bold",
  fontSize: 16,
  mb: "12px",
};
export default function App(props) {
  return (
    <UI.Col center p={2}>
      <UI.Col maxWidth={1024} spacing={2}>
        <UI.Text variant="h2" color="primary">
          Privacy Policy for Odelia Organic
        </UI.Text>
        <UI.Text variant="body1">
          At Odelia Organic, accessible from odeliaorganic.com, one of our main priorities is the privacy of our
          visitors. This Privacy Policy document contains types of information that is collected and recorded by Odelia
          Organic and how we use it. <br />
          <br />
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to
          contact us.
        </UI.Text>
        <UI.Text variant="body1">
          <span style={spanStyle}>Log Files</span>
          <br />
          Odelia Organic follows a standard procedure of using log files. These files log visitors when they visit
          websites. All hosting companies do this and a part of hosting services' analytics. The information collected
          by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and
          time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information
          that is personally identifiable. The purpose of the information is for analyzing trends, administering the
          site, tracking users' movement on the website, and gathering demographic information. Our Privacy Policy was
          created with the help of the Privacy Policy Generator.
          <br />
          <br />
          <span style={spanStyle}> Privacy Policies</span>
          <br />
          You may consult this list to find the Privacy Policy for each of the advertising partners of Odelia Organic.
          <br /> <br />
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used
          in their respective advertisements and links that appear on Odelia Organic, which are sent directly to users'
          browser. They automatically receive your IP address when this occurs. These technologies are used to measure
          the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on
          websites that you visit. <br />
          <br />
          Note that Odelia Organic has no access to or control over these cookies that are used by third-party
          advertisers.
          <br />
          <br />
          <span style={spanStyle}> Third Party Privacy Policies</span>
          <br />
          Odelia Organic's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to
          consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may
          include their practices and instructions about how to opt-out of certain options. <br /> <br /> You can choose
          to disable cookies through your individual browser options. To know more detailed information about cookie
          management with specific web browsers, it can be found at the browsers' respective websites. What Are Cookies?
          <br />
          <br />
          <span style={spanStyle}> Children's Information</span>
          <br />
          Another part of our priority is adding protection for children while using the internet. We encourage parents
          and guardians to observe, participate in, and/or monitor and guide their online activity. <br />
          <br />
          Odelia Organic does not knowingly collect any Personal Identifiable Information from children under the age of
          13. If you think that your child provided this kind of information on our website, we strongly encourage you
          to contact us immediately and we will do our best efforts to promptly remove such information from our
          records.
          <br />
          <br />
          <span style={spanStyle}> Online Privacy Policy Only</span>
          <br />
          This Privacy Policy applies only to our online activities and is valid for visitors to our website with
          regards to the information that they shared and/or collect in Odelia Organic. This policy is not applicable to
          any information collected offline or via channels other than this website.
          <br />
          <br />
          <span style={spanStyle}> Consent</span>
          <br />
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </UI.Text>
      </UI.Col>
    </UI.Col>
  );
}
