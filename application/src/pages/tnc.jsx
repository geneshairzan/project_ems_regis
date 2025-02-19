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
          Odelia Organic Tree Adoption Terms & Conditions
        </UI.Text>
        <UI.Text variant="body1">
          <span style={spanStyle}> 1. Eligibility</span>
          <br />
          Individuals aged 18 and above are eligible to participate in the Odelia Organic Tree Adoption Program.
          International participants are welcome.
          <br />
          <br />
          <span style={spanStyle}> 2. Tree Adoption Process</span>
          <br />
          Visit the designated page on our website to view available trees for adoption. Complete the adoption process
          by providing necessary information and, if applicable, making a financial contribution. Adoption confirmation
          will be sent via email.
          <br />
          <br />
          <span style={spanStyle}> 3.Donation Policies</span>
          <br />
          Tree adoption may involve a financial donation, which directly supports sustainable farming practices and
          environmental initiatives at Odelia Organic.
          <br />
          <br />
          <span style={spanStyle}> 4.User Responsibilities</span>
          <br />
          Users are responsible for providing accurate and up-to-date information during the adoption process. Users
          must keep their account information confidential and report any unauthorised access promptly.
          <br />
          <br />
          <span style={spanStyle}> 5.Communication</span>
          <br />
          Adopters will receive periodic updates on the growth and well-being of their adopted trees via
          odeliaorganic.com or via email. For inquiries, users can contact our customer support team at
          odeliaorganic@gmail.com.
          <br />
          <br />
          <span style={spanStyle}> 6.Tree Care and Maintenance</span>
          <br />
          Adopters are encouraged to learn about sustainable farming practices and may receive information on how they
          can contribute to the well-being of their adopted trees. Any on-site participation in tree care events will be
          communicated to adopters in advance. If the tree is damaged or dies due to natural factors during the adoption
          period, Odelia Organic Farm will offer another tree as its replacement to complete the remaining period of
          adoption. If the adapter is not interested with the offer, the remaining adoption term will be cancelled. In
          this case, the remaining funds for tree adoption are not refundable.
          <br />
          <br />
          <span style={spanStyle}> 7. Refund Policy</span>
          <br />
          Tree adoptions are non-refundable. In exceptional cases, refunds may be considered at the discretion of Odelia
          Organic Farm.
          <br />
          <br />
          <span style={spanStyle}> 8. Intellectual Property</span>
          <br />
          Images and content related to the adopted trees are the intellectual property of Odelia Organic. Adopters may
          share content for personal use but must not use it for commercial purposes without permission.
          <br />
          <br />
          <span style={spanStyle}> 9. Privacy and Data Protection</span>
          <br />
          User data will be handled in accordance with Odelia Organic’s Privacy Policy, available on our website.
          <br />
          <br />
          <span style={spanStyle}> 10. Termination of Adoption</span>
          <br />
          Odelia Organic reserves the right to terminate a tree adoption if there is a violation of these rules or
          failure to adhere to guidelines.
          <br />
          <br />
          <span style={spanStyle}> 11. Modification of Rules</span>
          <br />
          Odelia Organic reserves the right to modify these rules, and users will be notified of any changes via email.
          <br />
          <br />
          <span style={spanStyle}> 12. Termination of Service</span>
          <br />
          Odelia Organic may, at its discretion, terminate the entire tree adoption service, with notice provided to
          users.
        </UI.Text>
      </UI.Col>
    </UI.Col>
  );
}
