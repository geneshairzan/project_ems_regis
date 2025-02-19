import UI from "@gh/ui";
import { useRouter } from "next/router";

export default function App(props) {
  const loc = useRouter();
  return (
    <UI.Col center height="100dvh" spacing={2}>
      <UI.Text variant="h1" color="white">
        404
      </UI.Text>
      <UI.Text variant="body1" color="white">
        you're looking for something doesnt exist :(
      </UI.Text>
      <UI.Button onClick={() => loc.push("/")}>Back to homepage</UI.Button>
    </UI.Col>
  );
}
