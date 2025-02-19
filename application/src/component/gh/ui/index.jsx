import { Stack, Grid, ListItemButton } from "@mui/material";
import Row from "./row";
import Col from "./col";
import Text, { Elipsis, TextOverflow } from "./typography";
import { Span } from "./typography";
import Loader from "./apploader";
import Modal from "./modal";
import Divider from "./divider";
import Accordion from "./accordion";
import Collapse from "./collapse";
import Avatar from "./avatar";
import Img from "./img";
import Button from "./button";
import Icon from "./icon";
import IconButton from "./iconButton";
// import Share from "./share";

import DTSearch from "./datatables/search";
import DTFilter from "./datatables/filter";
import { search, order } from "./datatables/helper";
import FormLabel from "@gh/form/label";

const UI = {
  Avatar,
  Icon,
  Grid,
  Divider,
  Stack,
  Row,
  Col,
  Text,
  TextOverflow,
  Elipsis,
  Span,
  Button,
  IconButton,
  Loader,
  Modal,
  Accordion,
  Collapse,
  Img,
  // Share,
  Button,
  Datatables: {
    DTSearch,
    DTFilter,
    search,
    order,
  },
  FormLabel,
  ListItemButton: (props) => <ListItemButton sx={{ py: 0.5 }} {...props} />,
};

export default UI;
