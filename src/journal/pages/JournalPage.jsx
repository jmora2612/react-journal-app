import { AddOutlined, MailOutline } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <>
      {/* 
    <Typography variant='h1'>JournalPage</Typography>
    de esta manera usamos los iconos de material 
      
      
        <MailOutline/>
          de esta manera usamos los iconos de material 

    */}

      <JournalLayout>
        {!!active ? <NoteView /> : <NothingSelectedView />}

        <IconButton
          disabled={isSaving}
          onClick={onClickNewNote}
          size="large"
          sx={{
            color: "white",
            backgroundColor: "error.main",
            ":hover": { backgroundColor: "error.main", opacity: 0.9 },
            position: "fixed",
            right: 50,
            bottom: 50,
          }}
        >
          <AddOutlined />
        </IconButton>
      </JournalLayout>
    </>
  );
};
