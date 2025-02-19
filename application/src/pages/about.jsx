import UI from "@gh/ui";

export default function App(props) {
  return (
    <UI.Col center p={2}>
      <UI.Col maxWidth={1024} spacing={2}>
        <UI.Text variant="h2" color="primary">
          ABOUT US
        </UI.Text>
        <UI.Col spacing={1}>
          <UI.Text variant="body1">
            Odelia Organic Farm is an eco-friendly agro-tourism venture nestled in the serene Wonosalam, East Java,
            Indonesia.
          </UI.Text>
          <UI.Text variant="body1">
            Our unique concept combines sustainable tree adoption through our website/app with immersive farm stay
            experiences, allowing guests to reconnect with nature, reduce their carbon footprint, and make a positive
            impact on the environment and empower local farmers.
          </UI.Text>
        </UI.Col>
        <UI.Text variant="h2" color="primary">
          WHY CHOOSE US ?
        </UI.Text>
        <UI.Col spacing={1}>
          <UI.Text variant="body1">
            1. Personalized Tree Adoption: Choose from a diverse selection of Coffee tree species, each with its own
            characteristics profile.
          </UI.Text>
          <UI.Text variant="body1">
            2. Local Empowerment: Your tree adoption directly supports small-scale farmers and rural communities. By
            adopting trees, you help create sustainable livelihoods, strengthen local economies, and empower farmers to
            preserve their land.
          </UI.Text>
          <UI.Text variant="body1">
            3. Verified Sustainability: Our commitment to transparent and sustainable practices ensures that your
            adoption makes a real and lasting difference. We provide regular updates on the growth and impact of your
            trees.
          </UI.Text>
          <UI.Text variant="body1">
            4. Escape to Serenity: Experience the beauty and tranquility of rural life, far away from the hustle and
            bustle of the city. Reconnect with nature, savor the fresh air, and find peace in our picturesque
            countryside setting.
          </UI.Text>
          <UI.Text variant="body1">
            5. Cozy Accommodations: Enjoy comfortable and charming farmstay accommodations with modern comforts. Sleep
            soundly in the heart of nature, far away from the noise and stress of urban living.
          </UI.Text>
          <UI.Text variant="body1">
            6. Crop-to-Cup Delights: Embark on an unforgettable coffee adventure from the moment you step onto our lush
            coffee farm. Witness every stage of the coffee journey, from bean cultivation to the perfect brew.
          </UI.Text>
          <UI.Text variant="body1">
            7. Animal Conservation Our business actively contributes to the protection and preservation of majestic
            Hornbill and Eagle birds species, fostering a harmonious coexistence between wildlife and the farmstay.
          </UI.Text>
        </UI.Col>
        <UI.Text variant="body1"></UI.Text>
      </UI.Col>
    </UI.Col>
  );
}
