import {
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { IconCurrentLocation, IconTrash } from "@tabler/icons-react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../logic/redux-store/hooks";
import { setUiState } from "../../../logic/redux-store/feature/UserInterfaceSlice";
import { deleteMarkLocation } from "../../../logic/redux-store/feature/MarkLocationSlice";

function LocationList() {
  const markLocationRedux = useAppSelector((state) => state.markLocation);
  const dispatch = useAppDispatch();
  const locationList = Object.values(markLocationRedux.markLocation);
  return (
    <List
      className="default-scrollbar"
      sx={{
        height: 100,
        width: "100%",
        overflowY: "scroll",
        border: "0.3px solid #4d4d4d",
        borderRadius: 1,
      }}
    >
      {locationList.map((i, index) => {
        return (
          <ListItem
            key={index}
            dense
            secondaryAction={
              <ButtonGroup>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="primary"
                  sx={{
                    "&.MuiButton-root": {
                      border: 0,
                      borderRadius: 0,
                      mx: 2,
                    },
                  }}
                  onClick={() => {
                    dispatch(
                      setUiState({
                        name: "scrollRequest",
                        value: {
                          x: i.x,
                          y: i.y,
                        },
                      })
                    );
                  }}
                >
                  <IconCurrentLocation size={14} color={grey[200]} />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="primary"
                  sx={{
                    "&.MuiButton-root": {
                      border: 0,
                      borderRadius: 0,
                      mx: 2,
                    },
                  }}
                  onClick={() => {
                    dispatch(deleteMarkLocation(i.name));
                  }}
                >
                  <IconTrash size={14} color={grey[200]} />
                </IconButton>
              </ButtonGroup>
            }
          >
            <ListItemText
              sx={{
                color: "grey.200",
                height: 20,
                overflow: "hidden",
              }}
              style={{
                fontSize: "124px",
              }}
            >
              <Typography component={"div"} fontSize={12}>
                {i.name}
              </Typography>
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}

export default LocationList;
