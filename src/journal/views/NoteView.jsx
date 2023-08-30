import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImagenGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSave,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note);

  const prueba = useMemo(() => note, []);

  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSave.length > 0) {
      Swal.fire("Nota actualizada", messageSave, "success");
    }
  }, [messageSave]);

  const onSaveNote = () => {
    if (prueba === formState) return;
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = ()=>{
    dispatch(startDeletingNote())
  }

  const fileInputRef = useRef();

  return (
    <>
      <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Grid item>
          <Typography fontSize={39} fontWeight="light">
            {dateString}
          </Typography>
        </Grid>
        <Grid item>
          <input
            type="file"
            multiple
            onChange={onFileInputChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          <IconButton
            color="primary"
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined />
          </IconButton>

          <Button
            disabled={isSaving}
            onClick={onSaveNote}
            color="primary"
            sx={{ p: 2 }}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Grid>
        <Grid container>
          <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un titulo"
            label="Titulo"
            name="title"
            value={title}
            onChange={onInputChange}
            sx={{ border: "none", mb: 1 }}
          />

          <TextField
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="Que sucedio en el dia de hoy?"
            minRows={5}
            name="body"
            value={body}
            onChange={onInputChange}
            sx={{ border: "none", mt: 1 }}
          />
        </Grid>

        <Grid container justifyContent='end'>
          <Button onClick={onDelete} sx={{mt:2}} color="error">
            <DeleteOutline />
            Borrar
          </Button>
        </Grid>

      </Grid>
      <ImagenGallery images={note.imageUrls} />

    </>
  );
};
