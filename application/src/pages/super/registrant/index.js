import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import h from "@gh/helper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context";
import Datatables from "@gh/dataTables";
import { getInfo } from "@/model";

export default function App(props) {
  const { r } = React.useContext(Context);
  let ranks = [
    { id: 1, name: "Legend" },
    { id: 2, name: "Mytic" },
    { id: 3, name: "Mytic Glory" },
  ];
  let loc = useFetch({ url: `data/location?_token=223344!!` });

  if (!r.query.eid) return;

  const [onDetail, setonDetail] = useState();
  const event = useFetch({ url: `event/${r.query.eid}` });
  const registrant = useFetch({ url: `registrant?eid=${r.query.eid}` });
  let model = "registrant";

  if (!event.data || !registrant.data) return;

  return (
    <UI.Col px={{ xs: 2, md: 5 }} width="100%" flex={1}>
      {onDetail && (
        <UI.Modal open onClose={() => setonDetail()}>
          <Preview event={event.data} data={onDetail} onClose={() => setonDetail()} ranks={ranks} loc={loc.data} />
        </UI.Modal>
      )}
      <UI.IconButton name="arrow_back" color="black" size={64} onClick={r.back} />
      <UI.Row alignItems="center">
        <UI.Text variant="h2">{event?.data?.name}</UI.Text>
      </UI.Row>
      <UI.Text variant="h4">Registrant</UI.Text>

      <Datatables
        name="model"
        NewElement={null}
        data={registrant?.data?.map(getInfo(model, "datamap"))}
        col={getInfo(model, "col")}
        clickedRow={(id) => setonDetail(registrant?.data.find((d) => d.id == id))}
        options={{ rowEvenColor: "#ffffff", rowOddColor: "#ffffff" }}
      />
    </UI.Col>
  );
}

function Preview({ data, event, ranks, loc, onClose }) {
  return (
    <UI.Col
      width="100%"
      gap={2}
      sx={{
        bgcolor: "grey",
        overflow: "auto",
        p: 5,
        maxWidth: 920,
        color: "black",
      }}
    >
      <UI.Row spaced width="100%">
        <UI.Text variant="h4" bold color="primary.main">
          Detail
        </UI.Text>
        <UI.IconButton name="close" color="error.main" onClick={onClose} />
      </UI.Row>
      <PreviewItem label="Nama Lengkap" value={data?.name} />
      <PreviewItem label="Tanggal Lahir" value={h.date.format(data.dob)} />
      <PreviewItem label="Lokasi" value={loc.kabupaten.find((d) => d.id == data.kabupaten_id)?.name} />
      <PreviewItem label="Nick Name" value={data?.nickname} />
      <PreviewItem label="Ingame ID" value={data?.ingame_id} />
      <PreviewItem label="No. HP/WA" value={data?.no_hp} />
      <PreviewItem label="Rank" value={ranks[parseInt(data.rank)].name || "dasdasd"} />
      <PreviewItem label="Tournament Date" value={event?.tanggal_options[parseInt(data.tournament_date)] || "dasdasd"} />
      <PreviewItem label="Attachement" value={""} />
      <UI.Row gap={2} overflow="auto" pb={2}>
        <img
          src={`/api/file/registrant/${data.id}_photo.png`}
          style={{
            height: 180,
            width: "auto",
          }}
          alt=""
        />

        <img
          src={`/api/file/registrant/${data.id}_id.png`}
          style={{
            height: 180,
            width: "auto",
          }}
          alt=""
        />

        <img
          src={`/api/file/registrant/${data.id}_ss.png`}
          style={{
            height: 180,
            width: "auto",
          }}
          alt=""
        />
      </UI.Row>
    </UI.Col>
  );
}

function PreviewItem({ label, value }) {
  return (
    <UI.Row>
      <UI.Text variant="body1" width={200} bold>
        {label}
      </UI.Text>
      <UI.Text variant="body1">{value}</UI.Text>
    </UI.Row>
  );
}
