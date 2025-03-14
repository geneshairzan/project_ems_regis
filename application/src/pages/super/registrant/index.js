import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import h from "@gh/helper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context";
import Datatables from "@gh/dataTables";
import { getInfo } from "@/model";
import RemoteImg from "@/component/remoteImg";

export default function RegistrantList(params) {
  const { r } = React.useContext(Context);

  if (!r.query.eid) return;

  return <MainApp eid={r.query.eid} />;
}

const exportToCSV = (data, filterKeys) => {
  // Extract only selected keys from data
  const filteredData = data.map((obj) => Object.fromEntries(filterKeys.map((key) => [key, obj[key]])));

  // Convert to CSV format
  const csvRows = [];
  const headers = filterKeys.join(","); // Create headers from selected keys
  csvRows.push(headers);

  for (const row of filteredData) {
    const values = filterKeys.map((key) => row[key] || "").join(",");
    csvRows.push(values);
  }

  const csvContent = csvRows.join("\n");

  // Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "filtered_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function MainApp({ eid }) {
  const { r } = React.useContext(Context);
  const [reconfirm, setreconfirm] = useState(false);

  let ranks = [
    { id: 1, name: "Legend" },
    { id: 2, name: "Mytic" },
    { id: 3, name: "Mytic Glory" },
  ];
  let loc = useFetch({ url: `data/location?_token=223344!!` });

  const [onDetail, setonDetail] = useState();
  const event = useFetch({ url: `event/${eid}` });
  const registrant = useFetch({ url: `registrant?eid=${eid}` });
  let model = "registrant";

  if (!event.data || !registrant.data) return;

  function exportMap(d) {
    return {
      ...d,
      status: d.status == 0 ? "Waiting" : "Approved",
      tournament_date: event?.data?.tanggal_options[parseInt(d.tournament_date)],
      img: d?.photo_ss_path ? `${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/registrant/${d.photo_ss_path}?render=1&k=fs2dK6Lfj` : "",
    };
  }

  async function handleExportDelete() {
    exportToCSV(registrant?.data.map(exportMap), ["name", "ingame_id", "nickname", "email", "no_hp", "tournament_date", "status", "img"]);
    let res = await fetcher({
      url: "registrant/clear",
      method: "post",
      data: {
        event_id: eid,
      },
    });
    registrant.reload();
    setreconfirm(false);
  }

  return (
    <UI.Col px={{ xs: 2, md: 5 }} width="100%" flex={1}>
      {reconfirm && <Reconfirm onOk={handleExportDelete} onCancel={() => setreconfirm(false)} />}
      {onDetail && (
        <UI.Modal open onClose={() => setonDetail()}>
          <Preview event={event.data} data={onDetail} onReload={registrant.reload} onClose={() => setonDetail()} ranks={ranks} loc={loc.data} />
        </UI.Modal>
      )}
      <UI.IconButton name="arrow_back" color="black" size={64} onClick={r.back} />
      <UI.Row spaced>
        <UI.Text variant="h2">{event?.data?.name}</UI.Text>
        <UI.Row gap={2}>
          <UI.Button onClick={() => setreconfirm(true)} variant="outlined" color="secondary">
            Export and Delete
          </UI.Button>
          <UI.Button
            onClick={() =>
              exportToCSV(registrant?.data.map(exportMap), ["name", "ingame_id", "nickname", "email", "no_hp", "tournament_date", "status", "img"])
            }
            variant="outlined"
          >
            Export CSV
          </UI.Button>
        </UI.Row>
      </UI.Row>
      <UI.Text variant="h4">Registrant</UI.Text>
      {/* <RowItem header data={["Name", "Email", "Image", "In Game ID", "Phone number", "status"]} /> */}
      {/* {registrant?.data?.map((d) => (
        <RowItem onClick={() => setonDetail(d)} data={[d.name, d.email, "images", d.ingame_id, d.no_hp, d.status == 0 ? "waiting" : "approved"]} />
      ))} */}
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

function Reconfirm({ onCancel, onOk }) {
  return (
    <UI.Modal open>
      <UI.Col
        sx={{
          bgcolor: "white",
          color: "black",
          p: 2,
          minWidth: 480,
          gap: 2,
        }}
        center
      >
        <UI.Text variant="h4">Are you sure ? </UI.Text>
        <UI.Text variant="body1">All current listed registrant will deleted </UI.Text>
        <UI.Row gap={2}>
          <UI.Button color="error" onClick={onCancel}>
            cancel
          </UI.Button>
          <UI.Button onClick={onOk}>continue</UI.Button>
        </UI.Row>
      </UI.Col>
    </UI.Modal>
  );
}

function RowItem({ data, header = false, onClick }) {
  return (
    <UI.Row
      onClick={onClick}
      sx={{
        color: header ? "white" : "black",
        height: 48,
        borderBottom: "1px solid lightgrey",
        alignItems: "center",
        ...(header && {
          bgcolor: "primary.main",
        }),
      }}
    >
      <UI.Col px={1} flex={1}>
        <UI.Text variant="body1">{data[0]}</UI.Text>
      </UI.Col>
      <UI.Col px={1} flex={1}>
        <UI.Text variant="body1">{data[1]}</UI.Text>
      </UI.Col>
      <UI.Col px={1} flex={1}>
        <UI.Text variant="body1">{data[2]}</UI.Text>
      </UI.Col>
      <UI.Col px={1} flex={1}>
        <UI.Text variant="body1">{data[3]}</UI.Text>
      </UI.Col>
      <UI.Col px={1} flex={1}>
        <UI.Text variant="body1">{data[4]}</UI.Text>
      </UI.Col>
      <UI.Col px={1} flex={1}>
        <UI.Text variant="body1">{data[5]}</UI.Text>
      </UI.Col>
    </UI.Row>
  );
}

function Preview({ data, event, ranks, loc, onClose, onReload }) {
  let img_opt = [`${data.photo_ss_path}`, `${data.id}_ss.png`, `${data.id}_ss.jpg`, `${data.id}_ss.jpeg`];
  const [imageState, setimageState] = useState(0);

  async function handleApproved() {
    let res = await fetcher({
      url: "registrant/status",
      method: "post",
      data: {
        id: data?.id,
        status: data?.status == 0 ? 1 : 0,
      },
    });
    onClose();
    onReload();
  }

  function handleImgError() {
    imageState < 3 && setimageState((p) => p + 1);
  }

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
      <PreviewItem label="Satus" value={data?.status == "1" ? "Approved" : "Waiting"} />
      <PreviewItem label="Nama Lengkap" value={data?.name} />
      {/* <PreviewItem label="Tanggal Lahir" value={h.date.format(data.dob)} /> */}
      {/* <PreviewItem label="Lokasi" value={loc.kabupaten.find((d) => d.id == data.kabupaten_id)?.name} /> */}
      {/* <PreviewItem label="Nick Name" value={data?.nickname} /> */}
      <PreviewItem label="Ingame ID" value={data?.ingame_id} />
      <PreviewItemLink label="No. HP/WA" value={data?.no_hp} />
      {/* <PreviewItem label="Rank" value={ranks[parseInt(data.rank)].name || "dasdasd"} /> */}
      <PreviewItem label="Tournament Date" value={event?.tanggal_options[parseInt(data.tournament_date)] || "dasdasd"} />
      <PreviewItem label="Attachement" value={""} />

      <UI.Row gap={2} overflow="auto" pb={2}>
        {/* <img
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/registrant/${data.id}_photo.png`}
          style={{
            height: 180,
            width: "auto",
          }}
          alt=""
        />

        <img
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/registrant/${data.id}_id.png`}
          style={{
            height: 180,
            width: "auto",
          }}
          alt=""
        /> */}
        <RemoteImg
          key={imageState}
          // onError={handleImgError}
          // src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/registrant/${img_opt[imageState]}`}
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/registrant/${data?.photo_ss_path}?render=1&k=fs2dK6Lfj`}
          style={{
            height: 180,
            width: "auto",
          }}
        />
        {/* <img
          key={imageState}
          onError={handleImgError}
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/registrant/${img_opt[imageState]}`}
          style={{
            height: 180,
            width: "auto",
          }}
          alt=""
        /> */}
      </UI.Row>

      <UI.Col>
        <UI.Text variant="body1" bold>
          Actions
        </UI.Text>
        <UI.Button onClick={handleApproved}>{data.status == 0 ? "Approved" : "Cancel Approval"}</UI.Button>
      </UI.Col>
    </UI.Col>
  );
}

function PreviewItemLink({ label, value }) {
  return (
    <a href={`http://wa.me/62${value}`} target="_blank">
      <UI.Row>
        <UI.Text variant="body1" width={200} bold>
          {label}
        </UI.Text>
        <UI.Text variant="body1" color="primary.dark">
          wa.me/62{value}
        </UI.Text>
      </UI.Row>
    </a>
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
