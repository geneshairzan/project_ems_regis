import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";

import { Stack, Typography, ListItemButton } from "@mui/material";
import Datatables from "@gh/dataTables";

import Context from "@/component/context";
import { useRouter } from "next/router";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { getInfo } from "@/model";
import { Menu, Fade } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useSwitch from "@gh/useSwitch";

export default function App({ config }) {
  const { app, r } = React.useContext(Context);
  const model = "event";
  const [morestate, setmorestate] = useState();
  const onTrash = useSwitch(false);
  const data = useFetch({ url: onTrash.ison ? `trash/${model}` : model });

  async function handleDelete() {
    let res = await data.fetch({
      url: model,
      method: "delete",
      data: {
        id: morestate?.id,
        deleted_at: new Date(),
      },
    });
    if (res?.id) {
      data.reload();
      setmorestate({});
    }
  }

  useEffect(() => {
    data.reload();
  }, [onTrash.ison]);

  return (
    <Stack flexGrow={1} overflow="auto" spacing={2}>
      <UI.Stack
        flexGrow={1}
        sx={{
          minWidth: 720,
        }}
      >
        {data?.get() && (
          <Datatables
            name="model"
            data={data.get()?.map(getInfo(model, "datamap"))}
            col={[...getInfo(model, "col"), ...(onTrash.ison ? [{ name: "deleted_at", label: "Deleted at", type: "date", w: 200 }] : [])]}
            clickedRow={(id) => r.push(`/super/registrant?eid=${id}`)}
            NewElementConfig={{
              to: `/super/event/create`,
              label: `New ${model}`,
            }}
            // extraEl={
            //   <UI.Button
            //     startIcon={<DeleteIcon color={onTrash.ison ? "error" : "primary"} />}
            //     variant="outlined"
            //     sx={{
            //       borderRadius: 6,
            //     }}
            //     onClick={onTrash.toggle}
            //   >
            //     View Trashes
            //   </UI.Button>
            // }
            clickedMore={
              !onTrash.ison
                ? (id, e) =>
                    setmorestate({
                      id: id,
                      open: true,
                      anchorEl: e.currentTarget,
                    })
                : undefined
            }
            rowChecker={true}
            options={{ rowEvenColor: "#ffffff", rowOddColor: "#ffffff" }}
            // clickedEdit={(id) => router.push(`/${router.query.model}/${id}`)}
          />
        )}
      </UI.Stack>
      {morestate?.open && <MoreComponent morestate={morestate} setmorestate={setmorestate} model={model} modelinfo={getInfo(model)} onDelete={handleDelete} />}
    </Stack>
  );
}

function MoreComponent({ morestate, setmorestate, model, modelinfo, onDelete, ...props }) {
  const router = useRouter();

  return (
    <Menu anchorEl={morestate.anchorEl} open={morestate.open} onClose={() => setmorestate({})} TransitionComponent={Fade}>
      <UI.ListItemButton onClick={() => router.push(`/super/${model}/${morestate.id}`)}>
        <MoreMenu label="Edit" Icon={Icon.Edit} />
      </UI.ListItemButton>

      {modelinfo?.list?.viewable && (
        <UI.ListItemButton>
          <MoreMenu label="Preview" Icon={Icon.View} />
        </UI.ListItemButton>
      )}

      {modelinfo?.list?.deleteable && (
        <UI.ListItemButton onClick={onDelete}>
          <MoreMenu label="Delete" Icon={Icon.Close} color="error" />
        </UI.ListItemButton>
      )}
    </Menu>
  );
}
function MoreMenu({ label, Icon, color }) {
  return (
    <UI.Row alignItems="center" spacing={1}>
      <Icon
        color={color}
        sx={{
          fontSize: 16,
        }}
      />
      <UI.Text variant="body2" bold>
        {label}
      </UI.Text>
    </UI.Row>
  );
}
