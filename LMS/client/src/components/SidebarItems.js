import {  Link } from "react-router-dom";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CodeIcon from "@mui/icons-material/Code";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LabelIcon from '@mui/icons-material/Label';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function SidebarItems(props) {
  const { open } = props;
  return (
      <List sx={{position:"fixed"}}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <ListItem disablePadding >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                display:"flex",
                maxWidth: open ?  "none": "60px !important",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <OndemandVideoIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Courses"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        
        <Link to="/playground" style={{ textDecoration: "none"}}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                display:"flex",
                maxWidth: open ?  "none": "60px !important",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CodeIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Playground"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/subscribed" style={{ textDecoration: "none"}}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                display:"flex",
                maxWidth: open ?  "none": "60px !important",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SubscriptionsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Subscribed"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/saved" 
        style={{ textDecoration: "none",
        
       
        }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                display:"flex",
                maxWidth: open ?  "none": "60px !important",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary={"Saved"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/mylearning" 
        style={{ textDecoration: "none",
        
       
        }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                display:"flex",
                maxWidth: open ?  "none": "60px !important",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary={"My Learnings"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/mycourse" 
        style={{ textDecoration: "none",
        
       
        }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                display:"flex",
                maxWidth: open ?  "none": "60px !important",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <EditNoteIcon />
              </ListItemIcon>
              <ListItemText primary={"Own Courses"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    
  );
}
