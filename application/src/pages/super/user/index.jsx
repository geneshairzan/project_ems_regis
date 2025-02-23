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
  const { app, auth } = React.useContext(Context);
  const router = useRouter();
  const model = "user";
  const [data, setdata] = useState([]);
  // const data = useFetch({
  //   url: "user",
  //   method: "get",
  // });
  const [morestate, setmorestate] = useState();
  const [hasRetried, sethasRetried] = useState(false);

  const onTrash = useSwitch(false);

  async function getData() {
    let res = await fetcher({
      url: onTrash.ison ? `trash/user` : "user",
      method: "get",
    });
    if (res.data) {
      setdata(res.data);
    } else {
      sethasRetried(true);
    }
  }

  useEffect(() => {
    getData();
  }, [onTrash.ison]);

  useEffect(() => {
    hasRetried && getData();
  }, [hasRetried]);

  async function handleDelete() {
    let res = await fetcher({
      url: model,
      method: "delete",
      data: {
        id: morestate?.id,
        deleted_at: new Date(),
      },
    });
    if (res?.data) {
      getData();
      setmorestate({});
    }
  }

  return (
    <Stack flexGrow={1} overflow="auto" spacing={2}>
      <UI.Stack flexGrow={1} overflow="auto">
        <Datatables
          name="model"
          data={data?.map(getInfo(model, "datamap"))}
          col={[...getInfo(model, "col"), ...(onTrash.ison ? [{ name: "deleted_at", label: "Deleted at", type: "date", w: 200 }] : [])]}
          NewElementConfig={{
            to: `${model}/create`,
            label: `New ${model}`,
          }}
          extraEl={
            auth?.user?.is_super && (
              <UI.Button
                startIcon={<DeleteIcon color={onTrash.ison ? "error" : "primary"} />}
                variant="outlined"
                sx={{
                  borderRadius: 6,
                }}
                onClick={onTrash.toggle}
              >
                View Trashes
              </UI.Button>
            )
          }
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
      </UI.Stack>
      {morestate?.open && <MoreComponent morestate={morestate} setmorestate={setmorestate} model={model} modelinfo={getInfo(model)} onDelete={handleDelete} />}
    </Stack>
  );
}

function MoreComponent({ morestate, setmorestate, model, modelinfo, onDelete, ...props }) {
  const router = useRouter();
  const { auth } = React.useContext(Context);

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

      {auth?.user?.is_super == 1 && (
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
