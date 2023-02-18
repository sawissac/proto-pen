
import { Stack } from "@mui/material";
import { useAppSelector } from "../../logic/redux-store/hooks";
import PropertyHeader from "./PropertyHeader";
import CssNameList from "./CssNameList";
import ApplyElement from "./ApplyElement";
import QuickApply from "./QuickApply";
import CssManual from "./CssManual";
import PropertyTable from "./PropertyTable";

function PropertyPane() {
  const UiRedux = useAppSelector((s) => s.ui);

  return (
    <Stack
      direction="column"
      className="default-scrollbar"
      style={{
        width: UiRedux.propertyPaneWidth,
        height: UiRedux.screen.height,
        overflowY: "scroll",
      }}
    >
      <PropertyHeader />
      <CssNameList />
      <ApplyElement />
      <QuickApply />
      <CssManual />
      <PropertyTable />
    </Stack>
  )
}

export default PropertyPane;
